import { getPlatform } from "@angular/core";
import { fg_event_parser, FgEventService } from "../service/fg-event/fg-event.service";
import { z } from "zod";

export const fg_error_event_options_parser = fg_event_parser.extend({
    type: z.string().default('fg.error.event'),
    error: z.string().default('ERROR_EVENT'),
    rethrow: z.boolean().default(true),
});
export type FG_ERROR_EVENT_OPTIONS = z.infer<typeof fg_error_event_options_parser>;

export function fg_error_event( options: FG_ERROR_EVENT_OPTIONS ) {
    return function(target: any, methode_name: string, descriptor: any): any {
        const $event = getPlatform()?.injector.get(FgEventService);
        const original_methode = descriptor.value;
        descriptor.value = function(...args: any[]) {
            try {
                return original_methode.apply(this, args);
            } catch( error: any ) {
                $event?.emit({
                    type: options.type,
                    data: {
                        ...options.data,
                        error: options.error
                    }
                })
                if(options.rethrow){
                    throw error
                }
            } 
            
        }
        return descriptor;
    }
}