import { Injectable } from '@angular/core';
import { FgBaseService } from '../../base/fg-base.service';
import { FgComponentBaseComponent } from '../../base/fg-component-base.component';
import { FgEventGeneric } from '../fg-event/fg-event.class';
import * as EVENTS from './fg-auth.event.const';

/** Turn const values imported to type-module to be processed */
type FgAuthEventModule = typeof EVENTS;
/** Provides typing for FgDetectDeviceTypeUserAgentServiceEvent  */
export type FgAuthEventType = FgAuthEventModule[keyof FgAuthEventModule];

/**
 * FgAuthEvent -
 * Provides the event-constants used to Flag-Application
 */

export class FgAuthEvent extends FgEventGeneric<FgAuthEventType, FgComponentBaseComponent | FgBaseService, any> {
  /** Event to be thrown when you attempt to login to the application */
  public static readonly LOGIN = EVENTS.LOGIN;
  /** Event to be thrown when user wants to logout of the application */
  public static readonly LOGOUT = EVENTS.LOGOUT;
  /** Event to be thrown when a user authorization should be performed with passed credentials successfully */
  public static readonly AUTHORIZE = EVENTS.AUTHORIZE;
  /** Event to be thrown when a user was authorized successfully */
  public static readonly AUTHORIZED = EVENTS.AUTHORIZED;
  /** Event to be thrown when user loses previous authorization, like after a logout */
  public static readonly AUTHORIZATION_ERROR = EVENTS.AUTHORIZATION_ERROR;
  /** Event to be thrown when user changes password succesfully */
  public static readonly PASSWORD_CHANGE_SUCCESS = EVENTS.PASSWORD_CHANGE_SUCCESS;
  /** Event to be thrown when user resets password successfully */
  public static readonly PASSWORD_RESET_SUCCESS = EVENTS.PASSWORD_RESET_SUCCESS;
  /** Event to be used to set and delete user credentials */
  public static readonly SET_CREDENTIALS = EVENTS.SET_CREDENTIALS;
}
