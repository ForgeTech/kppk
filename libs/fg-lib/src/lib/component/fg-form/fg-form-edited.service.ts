import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { distinctUntilChanged, filter, shareReplay } from 'rxjs/operators';
import { FgEventService } from '../../../service/fg-event/fg-event.service';
import { FgFormEvent } from './fg-form-edited.event';

/** Methode to share form-edit-state within the applicaiton */
@Injectable({
  providedIn: 'root',
})
export class FgFormEditedService {
  protected FORM_EDITED: boolean = false;
  /** Subject update stream of formEdited-state */
  protected FORM_EDITED$: Subject<boolean> = new BehaviorSubject(this.FORM_EDITED);
  /** Flag holding formEdited-state */
  get edited(): boolean {
    return this.FORM_EDITED;
  }
  set edited(edited: boolean) {
    this.FORM_EDITED$.next(edited);
  }
  /** Observable streaming current form-edited-state */
  public readonly edited$: Observable<boolean> = this.FORM_EDITED$.asObservable().pipe(shareReplay(1));
  /** CONSTRUCTOR */
  constructor(protected $event: FgEventService) {
    // Set current form-edited state
    this.FORM_EDITED$.subscribe(value => {
      this.FORM_EDITED = value;
    });
    // Listen to form-edited event to set formEdited to true
    this.$event.event$.pipe(filter(event => event.signature === FgFormEvent.EDIT)).subscribe(event => {
      // If event contains boolean value use set value
      if (event.data === false || event.data === true) {
        this.FORM_EDITED$.next(event.data);
      } else {
        // if event-value isn't set just use it as edited true
        this.FORM_EDITED$.next(true);
      }
    });
    // Listen to form-success/cancel event to set  formEdited to false
    this.$event.event$
      .pipe(filter(event => event.signature === FgFormEvent.CANCEL || event.signature === FgFormEvent.SUCCESS))
      .subscribe(event => {
        if (this.FORM_EDITED === true) {
          this.FORM_EDITED$.next(false);
        }
      });
  }
}
