import { ComponentType, Portal } from '@angular/cdk/portal';
import { 
  Component,
  ChangeDetectionStrategy,
  inject,
  input,
  output 
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

import { FgEventService } from '../../../service';
import { fg_layout_drawer_event_open_parser, FG_LAYOUT_DRAWER_OPEN_EVENT, FG_LAYOUT_DRAWER_OPEN_OPTIONS } from '../fg-layout-drawer.type';

/**
 * FgLayoutTriggerButtonComponent -
 * Component that can be used to
 */
@Component({
  selector: 'fg-layout-drawer-open-button',
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <button
      mat-icon-button
      (click)="triggerDrawerOpen($event)"
      (keyup.enter)="triggerDrawerOpen($event)"
    >
      <ng-content>
        <mat-icon>menu</mat-icon>
      </ng-content>
    </button>
  `,
  styles: [''],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FgLayoutDrawerOpenButtonComponent {
  protected $event = inject(FgEventService, {optional: true})
  /** Allows setting name used for source value */ 
  public readonly nameS = input('FgLayoutDrawerOpenButtonComponent', {alias: 'name'});
  /** Allows to change the direction from which the navigation is opened from (default: 'start') */
  public readonly fromS = input<'start' | 'end'>('start', { alias: 'from'});
  /** Allows to define the target layout of the open-drawer event (default: undefined)  */
  public readonly targetS = input<string>(undefined, {alias: 'target'});
  /** Allows to change the mode of the drawer (default: 'over') */
  public readonly modeS = input<'over' | 'push' | 'side'>('over', {alias: 'mode'});
  /** Allows to change if drawer should display a backdrop (default: true) */
  public readonly has_backdropS = input(true, {alias: 'has_backdrop'});
  /** Allows to pass the component- or template-reference that should be displayed */
  public readonly contentS = input<Portal<any> | undefined>( undefined, {alias: 'content'});
  /** Outputs the options object */
  public readonly eventO = output<FG_LAYOUT_DRAWER_OPEN_EVENT>({alias: 'event'});
  /** Methode used to trigger the dispatch of open drawer event */
  public triggerDrawerOpen(event: Event) {
    event.preventDefault();
      const options: FG_LAYOUT_DRAWER_OPEN_OPTIONS = {
        target: this.targetS(),
        source: this.nameS(),
        from: this.fromS(),
        mode: this.modeS(),
        has_backdrop: this.has_backdropS(),
        content: this.contentS(),
      };
      const parsed_event = fg_layout_drawer_event_open_parser.parse({ 
        type: 'fg.layout.drawer.event.open', 
        source: this.nameS(), 
        target: this.targetS(), 
        data: options
      })
      this.eventO.emit(parsed_event)
      this.$event?.emit(parsed_event);
    } 
}
