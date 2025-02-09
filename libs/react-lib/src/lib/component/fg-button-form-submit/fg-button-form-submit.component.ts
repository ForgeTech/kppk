import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  OnDestroy,
  OnInit,
  output,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { map, Observable, startWith, Subscription } from 'rxjs';

@Component({
  selector: 'fg-button-form-submit',
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
  ],
  template: `
    <button 
      class="w-full"
      mat-stroked-button
      type="submit"
      [color]="colorS()"
      [disabled]="DISABLED_S()"
      (click)="action($event)"
      (keydown.enter)="action($event)"
    >
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
export class FgButtonFormSubmitComponent implements OnInit, OnDestroy {

  public form_groupS = input.required<FormGroup>({alias: 'form_group'});

  public labelS = input<string | undefined>( undefined, {alias: 'label'});
  public iconS = input<string | undefined>( 'send', {alias: 'icon'});
  public svg_iconS = input<string | undefined>( undefined, {alias: 'svg_icon'});
  public colorS = input<string | undefined>( 'primary', {alias: 'color'});
  public disabledS = input<boolean>( false, {alias: 'disabled'});
  protected form_is_valid$$: Subscription| undefined;
  protected form_is_validS = signal(false);
  protected DISABLED_S = computed( () => {
    let disabled = false;
    if( 
      // Disable button when disabled input is true
      this.disabledS()
      // or when form is invalid
      || !this.form_is_validS()
    ) {
      disabled = true;
    }
    return disabled;
  })
  public submitO = output<Event>({alias: 'submit'});
  

  public ngOnInit(): void {
    this.form_is_valid$$ = this.form_groupS().statusChanges.pipe(
      map( _ => this.form_groupS().valid),
      startWith( this.form_groupS().valid )
    ).subscribe({
      next: ( is_valid: boolean ) => {
        this.form_is_validS.set(is_valid)
      }
    });
  }

  public ngOnDestroy(): void {
      this.form_is_valid$$?.unsubscribe()
  }

  protected action($event: Event) {
    $event?.preventDefault();
    this.submitO.emit($event);
  }
}
