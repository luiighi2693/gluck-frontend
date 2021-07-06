import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

// Components

import { OkConfirmationAlertComponent } from '../../shared/alerts/ok-confirmation-alert/ok-confirmation-alert.component';
import { ErrorSnackbarComponent } from '../../shared/alerts/error-snackbar/error-snackbar.component';
import { SuccessSnackbarComponent } from '../../shared/alerts/success-snackbar/success-snackbar.component';
import {GenericAlertComponent} from '../../shared/alerts/generic-alert/generic-alert.component';

@Injectable({
  providedIn: 'root'
})
export class  HandleAlertsProvider {

  constructor(private dialog: MatDialog,
              private snackbar: MatSnackBar) {
  }

  presentSnackbarSuccess(data?: string, duration = 5000) {
    return this.snackbar.openFromComponent(SuccessSnackbarComponent, {
      duration,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['success-snackBar'],
      data
    });
  }

  presentSnackbarError(data?: string, duration = 5000) {
    return this.snackbar.openFromComponent(ErrorSnackbarComponent, {
      duration,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['error-snackBar'],
      data
    });
  }

  presentGenericAlert(message: string, title = '¡Ha ocurrido un error!') {
    return this.dialog.open(GenericAlertComponent, {
      data: {title, message}
    });
  }


  presentErrorDialogOk(message: string, title = '¡Ha ocurrido un error!') {
    return this.dialog.open(OkConfirmationAlertComponent, {
      data: {title, message}
    });
  }

}
