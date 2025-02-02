import { HttpClient } from "@angular/common/http";
import { getPlatform } from "@angular/core";
import { forkJoin, Observable } from "rxjs";

export const parent_context_event_input = <T, E>({
  context,
  event,
}: {
  context: T;
  event: E;
}) => {
  // console.log('>>>>>>>>>>>>>>>>>>>PARENT_CONTEXT_EVENT_INPUT>>>>>>>>>>>>>>>>')
  // console.log( context )
  // console.log( event )
  return { context, event };
};

export const parent_context_event_input_test = <T, E>({
  context,
  event,
}: {
  context: T;
  event: E;
}) => {
  // console.log('>>>>>>>>>>>>>>>>>>>PARENT_CONTEXT_EVENT_INPUT>>>>>>>>>>>>>>>>')
  // console.log( context )
  // console.log( event )
  return { context, event };
};

export function load_object(to_load: Record<string, string>) {
  const $http = getPlatform()?.injector.get(HttpClient);
  const resources: Record<string, Observable<any>> = {};
  const sources = Object.keys(to_load).forEach((key) => {
    if( $http ) {
      resources[key] = $http.get(to_load[key]);
    } else {
      // TODO
      throw new Error(`ERROR: machine_utils > load_object requires angular 'getPlattform' to provide HttpClient`);
    } 
  });
  return forkJoin(resources);
}
