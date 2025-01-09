import { Component, ChangeDetectionStrategy, Input, inject } from '@angular/core';
import { FgComponentBaseComponent } from '../../base/fg-component-base.component';
import { FgComponentBaseService } from '../../base/fg-component-base.service';
import { MatListModule } from '@angular/material/list';
import { RxState } from '@rx-angular/state';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { FgCommonModule } from '../../module/fg-common/fg-common.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

export interface FgMessageBoxInterface {
  messages: string[];
  style: string;
}

/**
 * FgMessageBoxComponent -
 * Component to display warning/success-message
 */
@Component({
  selector: 'fg-message-box',
  template: `
    <ng-container *ngIf="this.state$ | push as state">
      <div class="fg-message-box">
        <div
          class="fg-message-item py-0 px-2 relative"
          *ngFor="let message of state.messages"
          [ngClass]="state.style">
          <a
            mat-icon-button
            class="flex w-full h-8 leading-8"
            href="">
            <mat-icon
              class=""
              *ngIf="isError$ | push"
              >thunderstorm</mat-icon
            >
            <mat-icon
              class=""
              *ngIf="!(isError$ | push)"
              class="self-end"
              >done</mat-icon
            >
            <span class="px-2">{{ message }}</span>
          </a>
          <div class="fg-message-item-bg top-0 left-0 h-full absolute block z-10 w-full"></div>
        </div>
      </div>
    </ng-container>
  `,
  styles: [],
  standalone: true,
  imports: [FgCommonModule, MatListModule, MatIconModule, MatButtonModule],
  providers: [RxState],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FgMessageBoxComponent extends FgComponentBaseComponent {
  protected $state = inject(RxState<FgMessageBoxInterface>)
  public isError$ = new BehaviorSubject(false);
  /** Holds the state of the component */
  protected state$ = this.$state.select();
  /** The messages to being displayed passed as variable*/
  @Input()
  public set messages(msg: string | string[]) {
    this.messages$ = of(msg);
  }
  /** The messages to being displayed passed as stream*/
  @Input()
  public set messages$(msg$: Observable<string | string[]>) {
    const transformed$ = msg$.pipe(
      map(msg => {
        if (msg instanceof Array === false) {
          msg = [msg as string];
        }
        return msg as string[];
      })
    );
    this.$state.connect('messages', transformed$);
  }

  /** The style to set on message-box*/
  @Input()
  public set style(style: string) {
    if (style.indexOf('mat-success') !== -1) {
      this.isError$.next(false);
    } else {
      this.isError$.next(true);
    }
    this.style$ = of(style);
  }
  /** The style to set on message-box passed as a stream*/
  @Input()
  public set style$(msg$: Observable<string>) {
    this.$state.connect('style', msg$);
  }

}
