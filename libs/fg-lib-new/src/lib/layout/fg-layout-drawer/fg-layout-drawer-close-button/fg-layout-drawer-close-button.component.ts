import { Component, ChangeDetectionStrategy, inject, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FgEventService } from '../../../service';
/**
 * FgLayoutDrawerCloseDrawerButtonComponent -
 * Component that can be used to dispatch a close-drawer event
 */
@Component({
  selector: 'fg-layout-drawer-close-button',
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <button 
      mat-icon-button
      (click)="triggerDrawerClose($event)"
      (keyup.enter)="triggerDrawerClose($event)"
    >
      <ng-content>
        <mat-icon>close</mat-icon>
      </ng-content>
    </button>
  `,
  styles: [''],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FgLayoutDrawerCloseButtonComponent {
  protected $event = inject(FgEventService, { optional: true })
  /** Allows setting name used for source value */ 
  public readonly nameS = input('FgLayoutDrawerCloseButtonComponent', {alias: 'name'});
  /** Allows to define the target layout of the open-drawer event (default: undefined)  */
  public readonly targetS = input<string>();
  /** Outputs the options object */
  public readonly optionsO = output<{source: string, target?: string}>({alias: 'options'});
  /** Methode used to trigger the dispatch of close drawer event */
  public triggerDrawerClose(event: Event) {
    event.preventDefault();
    const options = {
      source: this.nameS(), 
      target: this.targetS(),  
    }
    this.optionsO.emit(options);
    this.$event?.emit({ 
      type: 'fg.layout.drawer.event.close', 
      source: this.nameS(), 
      target: this.targetS(),
      data: options
    });

  }
}
