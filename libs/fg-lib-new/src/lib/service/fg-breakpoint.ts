import { DOCUMENT } from "@angular/common";
import { computed, effect, inject, Injectable, signal } from "@angular/core";
import { z } from "zod";
import { BreakpointObserver} from '@angular/cdk/layout';
import { map, Subscription } from "rxjs";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { FgBaseService } from "../base";
import { isArray } from "lodash-es";

export function to_kebap_case( str: string) {
    return str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}

export const fg_breakpoint_query_parser = z.string().toLowerCase().trim();
export type FG_BREAKPOINT_QUERY = z.infer<typeof fg_breakpoint_query_parser>;
export const fg_breakpoint_query_name_parser = z.string().transform( item => to_kebap_case( item ));
export type FG_BREAKPOINT_QUERY_NAME = z.infer<typeof fg_breakpoint_query_name_parser>;

export const fg_breakpoint_tuple_parser = z.array(
    z.tuple([fg_breakpoint_query_parser]).rest(fg_breakpoint_query_name_parser)
);
export type FG_BREAKPOINT_TUPLE = z.infer<typeof fg_breakpoint_tuple_parser>;

export const fg_breakpoints_parser = z.record(
    fg_breakpoint_query_name_parser,
    fg_breakpoint_query_parser
)
export type FG_BREAKPOINTS = z.infer<typeof fg_breakpoints_parser>;

@Injectable({
    providedIn: 'root'
})
export class FgBreakpoint extends FgBaseService {
    protected $document = inject(DOCUMENT);
    protected $breakpoint_observer = inject(BreakpointObserver);

    protected BREAKPOINTS_TO_OBSERVE_S = signal<FG_BREAKPOINT_TUPLE>([]);
    protected QUERY_TO_NAME_MAP_S = signal<Record<string, string[]>>({});
    protected breakpoints$$: Subscription | undefined;

    public readonly query_to_name_mapS = computed(()=> {
        return this.QUERY_TO_NAME_MAP_S();
    });

    protected NAMES_TO_QUERY_MAP_S = signal<Record<string, string>>({});
    public readonly names_to_query_mapS = computed(()=> {
        return this.NAMES_TO_QUERY_MAP_S();
    });

    protected QUERY_RESULT_MAP_S = signal<Record<string, boolean>>({});
    public readonly query_result_mapS = computed(()=> {
        return this.QUERY_RESULT_MAP_S();
    });

    public readonly matched_breakpointsS = computed( () => {
        const breakpoints_matched: string[] = [];
        const query_to_name_map = this.QUERY_TO_NAME_MAP_S();
        const quert_results = this.QUERY_RESULT_MAP_S();
        Object.keys( quert_results ).map( query => {
            const matched = quert_results[ query ];
            if( matched ) {
                breakpoints_matched.push(...query_to_name_map[query]);
            }
        })
        return breakpoints_matched;
    });

    protected pre_body_class_tokens: string[] = [];
    protected set_body_classesE = effect( () => {
        const cur_class_tokens = this.matched_breakpointsS()
        const cur_body_class_string = cur_class_tokens.join(' ');
        const pre_body_class_string = this.pre_body_class_tokens.join(' ');
        // If previous isn't falsy and current differs from previous
        if( pre_body_class_string && pre_body_class_string !== cur_body_class_string) {
            // remove previous tokens not available in current
            this.pre_body_class_tokens.forEach( token => {
                if( cur_class_tokens.indexOf( token ) === -1) {
                  this.$document.body.classList.remove(token);
                }
            });
            // add current tokens not available in previous
            cur_class_tokens.forEach( token => {
                if( this.pre_body_class_tokens.indexOf( token ) === -1) {
                  this.$document.body.classList.add(token);
                }
            });
        } 
        // if current tokens exist add them
        else if( cur_class_tokens.length ) {
            cur_class_tokens.forEach( token => {
                this.$document.body.classList.add( token );
            })
        }
        // Set current to previous
        this.pre_body_class_tokens = cur_class_tokens;
    });

    public register( breakpoints: FG_BREAKPOINTS ) {
        const parsed_breakpoints = fg_breakpoints_parser.parse(breakpoints);
        const break_points_to_observe = this.BREAKPOINTS_TO_OBSERVE_S();
        Object.keys(parsed_breakpoints).forEach( query_name => {
            // Read query from record<query_name, query>
            const query = parsed_breakpoints[ query_name ];
            // Check if a tuple with media query (should be first element) exists
            const existing_tuple_with_query = break_points_to_observe.find( tuple => tuple[0] === query);
            if( existing_tuple_with_query ) {
                // if tuple for query exists add query_name to tuple
                existing_tuple_with_query.push(query_name);
            } else {
               // add tuple for none-existing query
               break_points_to_observe.push([ query, query_name ]);
            }
        })
        this.setup_breakpoint_observer(break_points_to_observe);
    }

    public unregister( breakpoints: FG_BREAKPOINTS | string[] ) {
        let updated_breakpoints_to_observe = this.BREAKPOINTS_TO_OBSERVE_S();
        // Assume this is a list of queries or query_names
        if( isArray( breakpoints ) ) {
            // First filter queries - so tuples that get removed mustn't be searched for keys
            const as_queries = breakpoints.map( query_or_name => fg_breakpoint_query_parser.parse(query_or_name));
            updated_breakpoints_to_observe = updated_breakpoints_to_observe.filter( (tuple, index) => {
                const [ query ] = tuple;
                const found = as_queries.includes( query );
                // When query is found filter it from breakpoints_to_observe
                return found ? false : true;
            })
            // Remove keys
            const as_query_name = breakpoints.map( query_or_name => fg_breakpoint_query_name_parser.parse( query_or_name ));
            updated_breakpoints_to_observe = updated_breakpoints_to_observe.map( tuple => {
                // Query as index 0 will not match because they were already filtered
                const result = tuple.filter( name => as_query_name.includes( name ) ? false : true )
                return result as [ string, ...string[]];
            });
            updated_breakpoints_to_observe = updated_breakpoints_to_observe.filter( tuple => tuple.length > 1 ? true : false)
        } 
        // assume to be breakpoints
        else {
            const parsed_breakpoints = fg_breakpoints_parser.parse(breakpoints);
            Object.keys( parsed_breakpoints ).forEach( name => {
              const query_to_match = parsed_breakpoints[ name ];
              // Find index of tuple matching query
              const found_index = updated_breakpoints_to_observe.findIndex( tuple => {
                const [ query ] = tuple;
                return query === query_to_match;
              });
              // If found
              if( found_index > -1) {
                  const found_tuple = updated_breakpoints_to_observe[ found_index ];
                  // Store query
                  const [ query ] = found_tuple;
                  // Filter names section of the tuple
                  const filtered_names = found_tuple.slice( 1, found_tuple.length ).filter( name_to_check => name_to_check === name ? false : true);
                  // Overwrite old position
                  updated_breakpoints_to_observe[ found_index ] = [ query, ...filtered_names ];
              }
            });
        }
        this.setup_breakpoint_observer(updated_breakpoints_to_observe);
    }

    protected setup_breakpoint_observer( breakpoints_to_observe: FG_BREAKPOINT_TUPLE ) {
        this.BREAKPOINTS_TO_OBSERVE_S.set(breakpoints_to_observe);
        const names_to_query_map:Record<string, string> = {}; 
        const query_to_names_map = breakpoints_to_observe.reduce( (map, tuple ) => {
            const [query] = tuple;
            const keys = tuple.slice(1, tuple.length);
            map[query] = keys;
            names_to_query_map[ keys.join(" ")] = query;
            return map;
        }, {} as Record<string, string[]>)
        this.QUERY_TO_NAME_MAP_S.set(query_to_names_map);
        this.NAMES_TO_QUERY_MAP_S.set(names_to_query_map);
        const observer = this.get_breakpoint_observer( query_to_names_map );
        this.breakpoints$$?.unsubscribe()
        this.breakpoints$$ = observer.subscribe({
            next: result => {
                this.QUERY_RESULT_MAP_S.set( result );
            }
        });
    }

    protected get_breakpoint_observer( to_observe:Record<string, string[]>) {
        const queries: string[] = [];
        Object.keys(to_observe).forEach( key => {
            queries.push( key );
        });
        const breakpoint_results$ = this.$breakpoint_observer.observe( queries )
        .pipe(
            takeUntilDestroyed(),
            // map to breakpoints containing results for each query
            map( observer_results => observer_results.breakpoints ),
        );

  
        return breakpoint_results$;
    }
}