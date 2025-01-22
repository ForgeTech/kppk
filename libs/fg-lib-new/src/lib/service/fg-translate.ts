import { inject, Injectable } from "@angular/core";
import { TranslocoService } from "@jsverse/transloco";
import { combineLatest, map, Observable, startWith, switchMap } from 'rxjs';
import { FgBaseService } from "../base";

@Injectable({
    providedIn: 'root'
})
export class FgTranslate extends FgBaseService {
    protected $transloco = inject(TranslocoService); 

    public supplant = function (template_string?: string, value_object?: Record<string, string>) {
        if(template_string === undefined || value_object === undefined) {
            return template_string;
        }
        return template_string.replace(/{([^{{}}]*)}/g,
            (a, b) => {
                const r = value_object[b];
                return typeof r === 'string' || typeof r === 'number' ? r : a;
            }
        );
    };

    public get_translations$<T extends Record<string, string>>(
        keys_scope: T
    ): Observable<Record<keyof T, string>> {
       // Get scopes to load
        const scopes_to_load: string[] = [];
        Object.keys( keys_scope ).forEach( key => {
            const scope = keys_scope[key];
            if( scopes_to_load.indexOf( scope) === -1) {
                scopes_to_load.push( scope );
            }
        });
        const translation$ = this.$transloco.langChanges$.pipe(
            // Load initial values, before langChanges$ fires 
            startWith( this.$transloco.getActiveLang() ),
            // Load translation scopes
            switchMap( () => combineLatest(scopes_to_load.map( scope => this.$transloco.selectTranslation(scope) ))),
            // Translate keys
            map( () => {
               return Object.keys(keys_scope).reduce( (result, key) => {
                    const index = key as keyof T;
                    result[index] = this.$transloco.translate<string>(`${keys_scope[index]}.${key}`);
                    return result
                } , {} as Record<keyof T, string>)
            }),
        )
        return translation$; 
    }
} 