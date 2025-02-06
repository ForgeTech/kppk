import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressBarModule,
  ],
  selector: 'kppk-react-view-auth-layout-content',
  template: `
  @if( formS(); as form ) {
    <form [formGroup]="form" [action]="form_actionS()">
      <ng-container *ngTemplateOutlet="content" />
    </form>
  } 
  @else {
    <ng-container *ngTemplateOutlet="content" />
  }
  <ng-template #content>
    <div class="flex flex-col items-center justify-center">

      <ng-content select="[header]" />

    </div>
    <div class="mb-6 mt-4">
      <div class="relative pb-[2px] pt-10">
        @if( errorS() ) {
          <div class="mat-warn-bg absolute top-0 w-full px-4 py-2">

            <ng-content select="[error]"/>

          </div>
        } 
        @if( successS() ) {
          <div class="mat-primary-bg absolute top-0 w-full px-4 py-2">

            <ng-content select="[success]"/>

          </div>
        } 
        @if( pendingS() ){
          <mat-progress-bar class="absolute bottom-0 w-full" mode="indeterminate" />
        }
      </div>

      <ng-content/>

    </div>
    <div class="flex flex-col gap-2 md:!flex-row">
    
      <ng-content select="[buttons]"></ng-content>

    </div>  
  </ng-template>

  
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KppkReactViewAuthLayoutContentComponent {
  public formS = input<FormGroup | undefined>(undefined, {alias: 'form'});
  public form_actionS = input<string | undefined>(undefined, {alias: 'form_action'});
  public errorS = input<boolean | undefined>(undefined, {alias: 'error'});
  public successS = input<boolean | undefined>(undefined, {alias: 'success'});
  public pendingS = input<boolean | undefined>(undefined, {alias: 'pending'});

}
