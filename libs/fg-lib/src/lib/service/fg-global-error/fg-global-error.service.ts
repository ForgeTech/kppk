import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GlobalError implements ErrorHandler {
  constructor(
    // private errorDialogService: ErrorDialogServic,
    private zone: NgZone
  ) {}

  handleError(error: any) {
    // Check if it's an error from an HTTP response
    if (!(error instanceof HttpErrorResponse)) {
      error = error.rejection; // get the error object
    }
    this.zone.run(() => {
      //   this.errorDialogService.openDialog(
      //     error?.message || 'Undefined client error',
      //     error?.status
      //   )
      console.log('Zone');
    });
    console.error('Error from global error handler', error);
  }
}
