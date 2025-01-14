import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RxPush } from '@rx-angular/template/push';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export type MatDemoDashboardCard = {
  id: string;
  title: string;
  cols: number;
  rows: number;
};

@Component({
  selector: 'mat-demo-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  
  imports: [
    RxPush,
    MatGridListModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
  ],
})
export class DashboardComponent {
  private breakpointObserver = inject(BreakpointObserver);
  /** Based on the screen size, switch from standard to one column per row */
  protected cards: Observable<MatDemoDashboardCard[]> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map(({ matches }) => {
        if (matches) {
          return [
            { id: '1', title: 'Card 1', cols: 1, rows: 1 },
            { id: '2', title: 'Card 2', cols: 1, rows: 1 },
            { id: '3', title: 'Card 3', cols: 1, rows: 1 },
            { id: '4', title: 'Card 4', cols: 1, rows: 1 },
          ];
        }

        return [
          { id: '1', title: 'Card 1', cols: 2, rows: 1 },
          { id: '2', title: 'Card 2', cols: 1, rows: 1 },
          { id: '3', title: 'Card 3', cols: 1, rows: 2 },
          { id: '4', title: 'Card 4', cols: 1, rows: 1 },
        ];
      })
    );
  protected trackBy(card: MatDemoDashboardCard): string {
    return card.id;
  }
}
