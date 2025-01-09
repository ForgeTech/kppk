import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';

import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

import { provideTranslocoScope } from '@jsverse/transloco';

import { FgCommonModule } from '@kppk/fg-lib';

import { snackTypes } from '../../service/fg-user-notification.service';
// import { IconDirective } from '../../directives/icon.directive';

@Component({
  standalone: true,
  selector: 'fg-snackbar',
  templateUrl: './fg-snackbar.component.html',
  styleUrls: ['./fg-snackbar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [provideTranslocoScope('general')],
  imports: [FgCommonModule],
})
export class FgSnackbarComponent implements OnInit {
  public barType = snackTypes;
  public iconColor = '';
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {}

  ngOnInit(): void {
    const st = this.data.snackType;
    this.iconColor =
      st === this.barType.Success
        ? 'text-green-500'
        : st === this.barType.Hint
          ? 'text-blue-500'
          : st === this.barType.Warning
            ? 'text-yellow-500'
            : 'text-red-500';
  }

  dismiss() {
    this.data.snackClose();
  }
}
