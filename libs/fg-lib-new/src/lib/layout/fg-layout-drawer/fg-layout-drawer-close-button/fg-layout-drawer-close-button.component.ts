import { Component, ChangeDetectionStrategy, inject, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FgEventService } from '../../../service';
import { FG_LAYOUT_DRAWER_CLOSE_OPTIONS, fg_layout_drawer_event_close_parser } from '../fg-layout-drawer.type';
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
      class="w-full"
      mat-stroked-button
      color="warn"
      (click)="trigger_close($event)"
      (keyup.enter)="trigger_close($event)"
    >
      <mat-icon class="right-4">close</mat-icon>
      {{ labelS() }}
    </button>
  `,
  styles: [''],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FgLayoutDrawerCloseButtonComponent {
  protected $event = inject(FgEventService, { optional: true })

  public readonly nameS = input<string | undefined>(undefined, {alias: 'name'});
  public readonly labelS = input<string | undefined>(undefined, {alias: 'label'});
  public readonly targetS = input<string | undefined>(undefined, {alias: 'target'});
  public readonly eventO = output<FG_LAYOUT_DRAWER_CLOSE_OPTIONS>({alias: 'event'});

  public trigger_close(event: Event) {
    event.preventDefault();
    const event_to_dispatch = fg_layout_drawer_event_close_parser.parse({
        type: 'fg.layout.drawer.event.close', 
        source: this.nameS(), 
        target: this.targetS(),
    })
    this.eventO.emit(event_to_dispatch)
    this.$event?.emit(event_to_dispatch);
  }
}
