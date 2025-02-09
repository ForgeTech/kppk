import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { fromEvent, of } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'fg-button-back-navigation',
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
  ],
  template: `
    <button class="w-full"
      mat-stroked-button
      [color]="colorS()"
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
export class FgButtonBackNavigationComponent {
  protected $document = inject(DOCUMENT);
  protected $router = inject(Router);
  
  protected WINDOW = this.$document.defaultView;
  protected event_popstate$ = this.$document.defaultView ? fromEvent(this.WINDOW as (Window & typeof globalThis), 'popstate') : of(undefined);
  protected event_popstateS = toSignal(this.event_popstate$, {initialValue: undefined})

  public labelS = input<string | undefined>( undefined, {alias: 'label'});
  public iconS = input<string | undefined>( 'arrow_back', {alias: 'icon'});
  public svg_iconS = input<string | undefined>( undefined, {alias: 'svg_icon'});
  public fallback_urlS = input<any[] | string | undefined>( undefined, {alias: 'fallback_url'});
  public colorS = input<string | undefined>( 'primary', {alias: 'color'});
  public disabledS = input<boolean>( false, {alias: 'disabled'});
  public navigation_extrasS = input<NavigationExtras | undefined>( undefined, {alias: 'navigation_extras'});
  
  protected DISABLED_S = computed( () => {
    let disabled = false;
    // Trigger if popstate is perceived so components that persist
    // during navigations are updated
    const popstate = this.event_popstateS();
    if( 
      // Disable button when disabled input is true
      this.disabledS()
      // or when history length is falsy and no fallback_url was given
      || ( !this.WINDOW?.history.length && !this.fallback_urlS() 
    )) {
      disabled = true;
    }
    return disabled;
  })

  // constructor() {
  //  effect( () => {
  //   const test = this.event_popstateS();
  //   console.log('>>>>>>>>>>POPSTATE>>>>>>>')
  //   console.log(this.WINDOW?.history.length);
  //  })

  //  of(true).pipe( delay(3000)).subscribe( value => {
  //   console.log('>>>>>>>>>>>>PUSH_STATE>>>>>>>>>>');
  //   this.WINDOW?.history.pushState( {}, '', '/react_view_imprint')
  //  })
  // }

  protected action($event?: Event) {
    $event?.preventDefault();
    console.log(this.WINDOW?.history.length);
    if( this.WINDOW?.history.length ){
      this.WINDOW?.history.back();
    }
    else if(this.fallback_urlS()) {
      const f_url = this.fallback_urlS();
      let target: any[];
      if( f_url ) {
        if( typeof f_url === 'string' ) {
          target = [ f_url ];
        } else {
          target = f_url;
        }
        this.$router.navigate(target, this.navigation_extrasS())
      }
    }
  }
}
