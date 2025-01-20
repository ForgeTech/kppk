import { inject, Injectable } from "@angular/core";
import { NavigationCancel, NavigationEnd, NavigationStart, Router } from "@angular/router";
import { filter, map, merge, Observable } from "rxjs";
import { EventObject } from "xstate";
import { FgXstateService } from "../../service";

@Injectable({
    providedIn: 'root'
})
export class FgRouterMachine {
    protected $router = inject(Router);
    protected $xstate = inject(FgXstateService);
    
    public getMachine( config?: any ) {
        const router$: Observable<EventObject> = merge(
            this.$router.events.pipe(
                filter( event => event instanceof NavigationStart ? true : false ),
                map( event => {
                const { url } = ( event as NavigationStart );
                return  { type: 'fg.navigation.event.start', data: { url }};
                }),
            ),
            this.$router.events.pipe( 
                filter( event => event instanceof NavigationEnd ? true : false ),
                map( event => {
                const { url, urlAfterRedirects } = ( event as NavigationEnd );
                return  { type: 'fg.navigation.event.end', broadcast: true, data: { url, urlAfterRedirects }};
                })
            ),
            this.$router.events.pipe( 
                filter( event => event instanceof NavigationCancel ? true : false ),
                map( event => {
                const { url, reason } = ( event as NavigationCancel );
                return  { type: 'fg.navigation.event.cancel', data: { url, reason }};
                })
            ),
        );
        return this.$xstate.fromEventObservable( ({ input }) => router$ );
    }
}
