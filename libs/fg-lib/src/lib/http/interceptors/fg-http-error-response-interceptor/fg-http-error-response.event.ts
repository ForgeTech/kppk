import { Injectable } from '@angular/core';
import * as EVENTS from './fg-http-error-response.event.const';
import { FgHttpErrorResponseInterceptor } from './fg-http-error-response.interceptor';
import { FgEventGeneric } from '../../../service/fg-event/fg-event.class';
import { HttpErrorResponse } from '@angular/common/http';

/** Turn const values imported to type-module to be processed */
type FgHttpErrorResponseModule = typeof EVENTS;
/** Provides typing for FgActiveViewEvent  */
export type FgHttpErrorResponseType = FgHttpErrorResponseModule[keyof FgHttpErrorResponseModule];

/**
 * FgHttpErrorResponseEvent -
 * Event to be dispatched from FgHttpErrorResponseInterceptor to allow reacting to
 * http-error-responses
 */

export class FgHttpErrorResponseEvent extends FgEventGeneric<
  FgHttpErrorResponseType,
  FgHttpErrorResponseInterceptor | any,
  HttpErrorResponse
> {
  public static readonly HTTP_ERROR_RESPONSE = EVENTS.HTTP_ERROR_RESPONSE;
}
