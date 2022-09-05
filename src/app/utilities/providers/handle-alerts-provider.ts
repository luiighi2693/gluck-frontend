import {Injectable} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';

// Components
import {OkConfirmationAlertComponent} from '../../shared/alerts/ok-confirmation-alert/ok-confirmation-alert.component';
import {ErrorSnackbarComponent} from '../../shared/alerts/error-snackbar/error-snackbar.component';
import {SuccessSnackbarComponent} from '../../shared/alerts/success-snackbar/success-snackbar.component';
import {GenericAlertComponent} from '../../shared/alerts/generic-alert/generic-alert.component';
import {RegisterPoolDialogComponent} from '../../shared/alerts/register-pool-dialog/register-pool-dialog.component';
import {InputDialogComponent} from '../../shared/alerts/input-dialog/input-dialog.component';
import {RulesDialogComponent} from '../../shared/alerts/rules-dialog/rules-dialog.component';
import {TimeRemainingComponent} from '../../shared/alerts/time-remaining/time-remaining.component';
import {ParticipantsComponent} from '../../shared/alerts/participants/participants.component';
import {GeneratedUrlComponent} from '../../shared/alerts/generated-url/generated-url.component';

@Injectable({
  providedIn: 'root'
})
export class HandleAlertsProvider {

  constructor(private dialog: MatDialog,
              private snackbar: MatSnackBar) {
  }

  presentInputDialog(title: string, value: string | number) {
    return this.dialog.open(InputDialogComponent, {
      data: {value, title},
      disableClose: true
    });
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
      data: {title, message},
      disableClose: true
    });
  }

  registerPoolDialog(
    poolId: string | number, title: string, user: string, cost: any, coins: any, prize: string, participants: number,
    image: string, rulesImage: string, password: any) {
    return this.dialog.open(RegisterPoolDialogComponent, {
      panelClass: 'dialog-container-custom',
      data: {poolId, title, cost, coins, prize, participants, image, user, rulesImage, password},
      disableClose: true
    });
  }

  presentRulesDialog(rulesImage: string) {
    return this.dialog.open(RulesDialogComponent, {
      panelClass: 'dialog-container-custom',
      data: {rulesImage},
      disableClose: true
    });
  }


  presentErrorDialogOk(message: string, title = '¡Ha ocurrido un error!') {
    return this.dialog.open(OkConfirmationAlertComponent, {
      data: {title, message},
      disableClose: true
    });
  }

  presentTimeRemainingDialog(time) {
    return this.dialog.open(TimeRemainingComponent, {
      panelClass: 'dialog-container-custom',
      data: {time},
    });
  }

  presentParticipantsDialog(participants: any) {
    return this.dialog.open(ParticipantsComponent, {
      panelClass: 'dialog-container-custom',
      data: {participants}
    });
  }

  presentGeneratedUrlDialog(url: string ) {
    return this.dialog.open(GeneratedUrlComponent, {
      data: {url},
      disableClose: true
    });
  }
}
