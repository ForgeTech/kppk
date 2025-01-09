import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { FgComponentBaseComponent } from '../fg-component-base/fg-component-base.component';
import { FgComponentBaseService } from '../fg-component-base/fg-component-base.service';
import { AbstractControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { map, filter, switchMap, distinctUntilChanged } from 'rxjs/operators';
import { FgEvent } from '../../class/fg-event.class';
import { FgComponentBaseEvent } from '../fg-component-base/fg-component-base.event';
import { FormValidationStateEnum } from '../../enum/enum.export';
/**
 * Icon-Validation
 */
@Component({
  selector: 'fg-form-validation-icon',
  templateUrl: './fg-form-validation-icon.component.html',
  styleUrls: ['./fg-form-validation-icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FgFormValidationIconComponent extends FgComponentBaseComponent {
  /**
   * Holds passed form-control status-string
   */
  entity: AbstractControl;
  /**
   * Observable to receive icon state
   */
  public icon$: Observable<string>;
  /**
   * Observable to receive icon color
   */
  public color$: Observable<string>;
  /**
   * CONSTRUCTOR
   */
  constructor(public $component: FgComponentBaseService) {
   super();
    const formControlAvailable$ = this.event$.pipe(
      filter((event: FgEvent) => {
        return event.signature === FgComponentBaseEvent.AFTER_VIEW_INIT;
      })
    );
    // Define Observable for Validation-State Icon
    this.icon$ = formControlAvailable$.pipe(
      switchMap(event => this.entity.statusChanges.pipe(distinctUntilChanged())),
      map(val => {
        return this.getFormControlValidationIcon(val);
      })
    );
    // Define Observable for Validation-State Color
    this.color$ = formControlAvailable$.pipe(
      switchMap(event => this.entity.statusChanges.pipe(distinctUntilChanged())),
      map(val => {
        return this.getFormControlValidationColor(val);
      })
    );
    // Revalidate field after-view-init to reveive initial icon$-, color$-state
    this.subscribe(formControlAvailable$, result => {
      this.entity.updateValueAndValidity();
    });
  }
  /**
   * Retun icon according to passed form-control validation
   * state
   * @param state
   */
  getFormControlValidationIcon(state: string): string {
    let icon: string = 'error_outline';
    switch (FormValidationStateEnum[state]) {
      case FormValidationStateEnum.INVALID:
        icon = 'error_outline';
        break;
      case FormValidationStateEnum.PENDING:
        icon = 'cached';
        break;
      case FormValidationStateEnum.VALID:
        icon = 'check_circle_outline';
        break;
    }
    return icon;
  }
  /**
   * Retun color according to passed form-control validation state
   * @param state
   */
  getFormControlValidationColor(state: string): string {
    let color: string = '';
    switch (FormValidationStateEnum[state]) {
      case FormValidationStateEnum.INVALID:
        color = 'warn';
        break;
      case FormValidationStateEnum.PENDING:
        color = 'accent';
        break;
      case FormValidationStateEnum.VALID:
        color = 'accent';
        break;
    }
    return color;
  }
}
