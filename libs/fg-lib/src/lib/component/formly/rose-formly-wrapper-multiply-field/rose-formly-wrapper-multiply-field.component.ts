import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'rose-formly-wrapper-multiply-field',
  templateUrl: './rose-formly-wrapper-multiply-field.component.html',
  styleUrls: ['./rose-formly-wrapper-multiply-field.component.scss'],
})
export class RoseFormlyWrapperMultiplyFieldComponent extends FieldWrapper /* implements OnDestroy, AfterViewInit */ {
  public multiplyValue$: BehaviorSubject<number> = new BehaviorSubject(0);
  // public valueToModelSubscription$: Subscription;
  // CONSTRUCTOR
  constructor() {
    super();
  }
  ngAfterViewInit(): void {
    this.formControl.valueChanges
      .pipe(
        startWith(this.formControl.value),
        map(value => {
          let result: number = 0;
          if (value) {
            result = this.to.multiplyValue * value;
          }
          return result;
        })
      )
      .subscribe(value => {
        this.multiplyValue$.next(value);
      });
  }
  // ngOnDestroy(): void {
  //   this.valueToModelSubscription$.unsubscribe();
  // }
}
