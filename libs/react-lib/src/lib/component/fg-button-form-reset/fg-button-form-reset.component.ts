import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { is_empty_obj } from '../../utils';

@Component({
  selector: 'fg-button-form-reset',
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
  ],
  template: `
    <button class="w-full"
      mat-stroked-button
      type="submit"
      [color]="colorS()"
    >
    <!-- (click)="action($event)"
    (keydown.enter)="action($event)" -->
    @if( svg_iconS() ) {
        <mat-icon [svgIcon]="svg_iconS() ?? ''" />
      }
      @else {
        <mat-icon [fontIcon]="iconS() ?? ''" />
      }
      {{ labelS() }}
    </button>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FgButtonFormSubmitComponent {

  public form_groupS = input.required<FormGroup>({alias: 'form_group'});
  public modelS = input<any | undefined>(undefined, {alias: 'model'});
  public labelS = input<string | undefined>( undefined, {alias: 'label'});
  public iconS = input<string | undefined>( 'send', {alias: 'icon'});
  public svg_iconS = input<string | undefined>( undefined, {alias: 'svg_icon'});
  public colorS = input<string | undefined>( 'primary', {alias: 'color'});
  public disabledS = input<boolean>( false, {alias: 'disabled'});
  
  protected DISABLED_S = computed( () => {
    let disabled = false;
    const form = this.form_groupS();
    const form_is_empty = !form.value || is_empty_obj( form.value );

    if( 
      // Disable button when disabled input is true
      this.disabledS()
      // or when 
      || form_is_empty
    ) {
      disabled = true;
    }
    return disabled;
  })


  protected action($event?: Event) {
    $event?.preventDefault();
    const model = this.modelS();
    const form = this.form_groupS();
    if( model ) {
      form.patchValue(model);
    } else {
      form.reset();
    }
  }
}
