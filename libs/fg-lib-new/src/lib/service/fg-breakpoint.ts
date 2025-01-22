import { DOCUMENT } from "@angular/common";
import { computed, effect, inject, Injectable, signal } from "@angular/core";
import { z } from "zod";
import { BreakpointObserver, Breakpoints as material_breakpoints} from '@angular/cdk/layout';
import { combineLatest, map, of, Subscription, tap } from "rxjs";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { FgBaseService } from "../base";

export function to_kebap_case( str: string) {
    return str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}

export const fg_breakpoint_parser = z.string();
export type FG_BREAKPOINT = z.infer<typeof fg_breakpoint_parser>;

export const fg_breakpoints_parser = z.record(
    z.string().transform( item => to_kebap_case(item)), 
    fg_breakpoint_parser
)
export type FG_BREAKPOINTS = z.infer<typeof fg_breakpoints_parser>;

@Injectable({
    providedIn: 'root'
})
export class FgBreakpoint extends FgBaseService {
    protected $document = inject(DOCUMENT);
    protected $breakpoint_observer = inject(BreakpointObserver);

    protected breakpoint_query_result_mapS = signal<Record<string, boolean>>({});
    protected breakpoint_key_result_mapS = signal<Record<string, boolean>>({});

    protected pre_body_class_string: string = '';
    protected cur_body_class_stringS = computed( () => {
        const key_results = this.breakpoint_key_result_mapS();
        const classes = Object.keys( key_results ).filter( key => this.breakpoint_key_result_mapS()[ key ] ? true : false )
            .map( key => key).join(' ');
        return classes;
    });
    protected set_body_classesE = effect( () => {
        const cur_body_class_string = this.cur_body_class_stringS();
        const cur_class_tokens = cur_body_class_string.split(' ');
        // If previous isn't falsy and current differs from previous
        if( this.pre_body_class_string && this.pre_body_class_string !== cur_body_class_string) {
            const pre_class_tokens = this.pre_body_class_string.split(' ');
            // remove previous tokens not available in current
            pre_class_tokens.forEach( token => {
                if( cur_class_tokens.indexOf( token ) === -1) {
                 this.$document.body.classList.remove(token);
                }
            });
            // add current tokens not available in previous
            cur_class_tokens.forEach( token => {
                if( pre_class_tokens.indexOf( token ) === -1) {
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
        this.pre_body_class_string = cur_body_class_string;
    })

    protected breakpoints_to_observe: FG_BREAKPOINTS = {};
    protected breakpoints$$: Subscription | undefined;
    
    constructor() {
        super()
        this.register( material_breakpoints )
    }

    public register( breakpoints: FG_BREAKPOINTS ) {
        const parsed_breakpoints = fg_breakpoints_parser.parse(breakpoints);
        this.breakpoints_to_observe = {
            ...this.breakpoints_to_observe,
            ...parsed_breakpoints
        }
       this.setup_breakpoint_observer( this.breakpoints_to_observe );
    }

    public unregister( breakpoints: FG_BREAKPOINTS | string[] ) {
        let keys_to_remove: string[];
        if( Array.isArray( breakpoints ) === false) {
            const parsed_breakpoints = fg_breakpoints_parser.parse(breakpoints);
            keys_to_remove = Object.keys(parsed_breakpoints);
        } else {
            keys_to_remove = breakpoints.map( item => to_kebap_case(item));
        }
        keys_to_remove.forEach( key => {
            const breakpoint_to_remove = this.breakpoints_to_observe[key];
            if( breakpoint_to_remove ) {
                delete this.breakpoints_to_observe[key];
            }
        });
        this.setup_breakpoint_observer( this.breakpoints_to_observe );
    }

    protected setup_breakpoint_observer( breakpoints: FG_BREAKPOINTS ) {
        const observer = this.get_breakpoint_observer( breakpoints );
        this.breakpoints$$?.unsubscribe()
        this.breakpoints$$ = observer.subscribe({
            next: result => {
                this.breakpoint_key_result_mapS.set( result );
            }
        });
    }

    protected get_breakpoint_observer( to_observe:Record<string, string>) {
        const breakpoint_keys: string[] = [];
        const breakpoint_queries: string[] = [];
        Object.keys(to_observe).forEach( key => {
            breakpoint_keys.push( key );
            breakpoint_queries.push( to_observe[ key ] );
        });
        // Create stream 
        const breakpoint_results$ = combineLatest([
            // of breakpoint keys
            of( breakpoint_keys ),
            // and media-query matching results
            this.$breakpoint_observer.observe( breakpoint_queries ).pipe(map( result => result.breakpoints ))
        ]).pipe( 
            takeUntilDestroyed(),
            tap( output => { 
                const query_result_map = output[1];
                this.breakpoint_query_result_mapS?.set(query_result_map);
            }),
            map( output => {
                const [breakpoint_keys, matching_results_map] = output;
                // Transform matching_result map to attay
                const matching_results_array = Object.keys( matching_results_map ).map( key => matching_results_map[ key ]);
                // Reduce breakpoint keys and matching result to a map
                const result_record = breakpoint_keys.reduce( (result_map, key, index ) => {
                    result_map[key] = matching_results_array[index];
                    return result_map;
                } , {} as Record<string, boolean>);
                return result_record;
            }
        ));
        return breakpoint_results$;
    }
}