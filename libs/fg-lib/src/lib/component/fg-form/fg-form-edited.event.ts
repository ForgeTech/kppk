import { Injectable } from '@angular/core';

/**
 * FgFormEvent -
 * Class containing the events to be dispatched by an instance of vlvm-form
 */

export class FgFormEvent {
  /** Event to be thrown when working on form is canceled */
  public static readonly CANCEL = 'Event_VlvVlvfForm_cancel';
  /** Event to be thrown when a change/edit appeared on form */
  public static readonly EDIT = 'Event_VlvVlvfForm_Edit';
  /** Event to be thrown when working on form is was ended with successful submit */
  public static readonly SUCCESS = 'Event_VlvVlvfForm_success';
  /** Event to be thrown when working on form is was ended with error on submit */
  public static readonly ERROR = 'Event_VlvVlvfForm_error';
  /** Event to be thrown if form-should be submitted */
  public static readonly SUBMIT = 'Event_VlvVlvfForm_submit';
}
