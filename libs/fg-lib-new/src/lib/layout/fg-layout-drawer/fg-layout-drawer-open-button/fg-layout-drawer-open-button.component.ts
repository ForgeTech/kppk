import { ComponentType } from '@angular/cdk/portal';
import { 
  Component,
  TemplateRef,
  ChangeDetectionStrategy,
  inject,
  input,
  output 
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { 
  FG_LAYOUT_DRAWER_OPTIONS, 
  fg_layout_drawer_options_parser 
} from '../fg-layout-drawer.type';
import { FgEventService } from '../../../service';

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
  public readonly positionS = input<'start' | 'end'>('start', {alias: 'position'});
  /** Allows to define the target layout of the open-drawer event (default: undefined)  */
  public readonly targetS = input<string>(undefined, {alias: 'target'});
  /** Allows to change the mode of the drawer (default: 'over') */
  public readonly modeS = input<'over' | 'push' | 'side'>('over', {alias: 'mode'});
  /** Allows to change if drawer should display a backdrop (default: true) */
  public readonly has_backdropS = input(true, {alias: 'has_backdrop'});
  /** Allows to pass the component- or template-reference that should be displayed */
  public readonly view_refS = input<ComponentType<any> | TemplateRef<any>>( undefined, {alias: 'view_ref'});
  /** Outputs the options object */
  public readonly optionsO = output<FG_LAYOUT_DRAWER_OPTIONS>({alias: 'options'});
  /** Methode used to trigger the dispatch of open drawer event */
  public triggerDrawerOpen(event: Event) {
    event.preventDefault();
      const options = fg_layout_drawer_options_parser.parse({
        target: this.targetS(),
        source: this.nameS(),
        position: this.positionS(),
        mode: this.modeS(),
        has_backdrop: this.has_backdropS(),
        view_ref: this.view_refS(),
      });
      this.optionsO.emit(options);
      this.$event?.emit({ 
        type: 'fg.layout.drawer.event.open', 
        source: this.nameS(), 
        target: this.targetS(), 
        data: options
      });
    } 
}
