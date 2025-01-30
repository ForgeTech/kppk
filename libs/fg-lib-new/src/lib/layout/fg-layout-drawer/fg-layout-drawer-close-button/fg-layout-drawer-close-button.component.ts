import { Component, ChangeDetectionStrategy, inject, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FgEventService } from '../../../service';
import { FG_LAYOUT_DRAWER_CLOSE_OPTIONS, fg_layout_drawer_close_options_parser, fg_layout_drawer_event_open_parser } from '../fg-layout-drawer.type';
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
  public readonly nameS = input<string | undefined>(undefined, {alias: 'name'});
  /** Allows to define the target layout of the open-drawer event (default: undefined)  */
  public readonly targetS = input<string | undefined>(undefined, {alias: 'target'});
  /** Outputs the options object */
  public readonly eventO = output<FG_LAYOUT_DRAWER_CLOSE_OPTIONS>({alias: 'event'});
  /** Methode used to trigger the dispatch of close drawer event */
  public triggerDrawerClose(event: Event) {
    event.preventDefault();

    const event_to_dispatch = fg_layout_drawer_event_open_parser.parse({
        type: 'fg.layout.drawer.event.close', 
        source: this.nameS(), 
        target: this.targetS(),
    })
    this.eventO.emit(event_to_dispatch)
    this.$event?.emit(event_to_dispatch);
  }
}
