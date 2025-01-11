import { Injectable, NgZone, inject } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';

import { FgSnackbarComponent } from './../component/fg-snackbar/fg-snackbar.component';

export enum snackTypes {
  Success = 'success',
  Warning = 'warning',
  Error = 'error',
  Hint = 'hint',
}

export interface snackBarCfg {
  panelClass?: string;
  duration?: number;
  header?: string;
  body?: string;
  customHeader?: string;
  snackType?: snackTypes;
  snackClose?: any;
  stay?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class FgUserNotificationService {
  protected $snackbar = inject(MatSnackBar);
  protected $zone = inject(NgZone);


  public async notify(snackCfg: snackBarCfg): Promise<number> {
    const notificationToken = new Date().valueOf();
    this.$zone.run(() => {
      const snackBar = this.$snackbar.openFromComponent(FgSnackbarComponent, {
        duration: snackCfg.duration ? snackCfg.duration : 4000,
        panelClass: snackCfg.panelClass ? ['tailwind-snack', snackCfg.panelClass] : ['tailwind-snack'],
        data: {
          snackClose: () => {
            snackBar.dismiss();
          },
          customHeader: snackCfg.customHeader,
          header: snackCfg.header,
          body: snackCfg.body,
          snackType: snackCfg.snackType,
          stay: snackCfg.stay ? true : false,
        },
      });
    });
    return notificationToken;
  }

  public dismiss() {
    this.$snackbar.dismiss();
  }
}
