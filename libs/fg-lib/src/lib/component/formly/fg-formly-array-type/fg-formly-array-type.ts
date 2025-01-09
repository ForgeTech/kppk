import { ScrollingModule } from '@angular/cdk/scrolling';
import { Component, ViewEncapsulation } from '@angular/core';
import { FieldArrayType, FormlyModule } from '@ngx-formly/core';
import { FgCommonModule } from '../../../module';


@Component({
  standalone: true,
  selector: 'pdv-array-type',
  styles: `
  .parts-calculation-form {
    height: 500px;
    background-color: red;
  }
  .parts-calculation-form-row {
    height: 50px;
    &:nth-child(even) {
      background-color: yellow;
    }
    &:nth-child(odd) {
      background-color: yellowgreen;
    }
  }
  `,
  template: `
    <ng-container *transloco="let t; read: 'form'">
      <!-- <cdk-virtual-scroll-viewport 
        class="parts-calculation-form"
        appendOnly
        [itemSize]="50"
      >
        <formly-field 
          class="parts-calculation-form-row"
          *cdkVirtualFor="let arrayField of field.fieldGroup; let i = index" 
          [field]="arrayField"
        > 
        </formly-field>
      </cdk-virtual-scroll-viewport> -->
      <ng-container *ngFor="let arrayField of field.fieldGroup; let i = index">
       <!-- {{ arrayField.model | json }}  -->
        <formly-field [field]="arrayField"> </formly-field>
      </ng-container>
    </ng-container>
  `,
  imports: [FgCommonModule, FormlyModule, ScrollingModule],
  // changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
}) /*implements AfterViewInit, OnDestroy*/
export class FgArrayTypeComponent extends FieldArrayType {
  // protected fieldHeadlines$: Subject<{}[]> = new Subject();
  // protected CHANGE$$: Subscription | undefined = undefined;
  // protected fieldGroupArray$: Subject<FormlyFieldConfig[]> = new Subject();
  // protected fieldGroupOptions$: Subject<FormlyFormOptions> = new Subject();
  // protected addForm = new FormGroup({});
  // protected ALLOW_ADDING$ = new BehaviorSubject<boolean>(true);
  // protected helperFormFields: FormlyFieldConfig;
  // CONSTRUCTOR
  constructor() {
    super();
    // console.log(this.formControl);
  }
  // protected shouldAddEmptyRow(field: FormlyFieldConfig): boolean {
  //   let result = false;
  //   if (field && field.props && field.formControl) {
  //     // If form-array model is empty add one
  //     // row so something is displayed
  //     field;

  //     // and form enabled
  //     if (!field.props.disabled) {
  //       // Get last row
  //       const formArray = field.formControl as FormArray;
  //       const lastRow = formArray.at(formArray.length - 1);
  //       const isEmpty = Object.keys(lastRow.value)
  //         .map(key => (lastRow.value as any)[key])
  //         .every((value: any) => (value ? false : true));
  //       result = !isEmpty;
  //     }
  //   }
  //   return result;
  // }

  // public ngAfterViewInit() {
  //   console.log('FIELDS');
  //   console.log(this.field);
  //   if (this.field.fieldGroup) {
  //     this.fieldGroupArray$.next(this.field.fieldGroup);
  //   }
  //   if (this.field.options) {
  //     this.fieldGroupOptions$.next(this.field.options);
  //   }
  //   this.CHANGE$$ = merge(
  //     // From Value
  //     this.field.formControl.valueChanges,
  //     // From Status
  //     this.field.formControl.statusChanges
  //   )
  //     .pipe(
  //       map(() => this.field),
  //       startWith(this.field),
  //       filter(value => (this.ALLOW_ADDING$.getValue() === true ? true : false))
  //     )
  //     .subscribe(field => {
  //       if (field.model.length === 0 || this.shouldAddEmptyRow(field)) {
  //         this.ALLOW_ADDING$.next(false);
  //         this.add();
  //         timer(1000).subscribe(value => this.ALLOW_ADDING$.next(true));
  //       }
  //     });
  // }

  // public ngOnDestroy(): void {
  //   this.CHANGE$$?.unsubscribe();
  // }
}
