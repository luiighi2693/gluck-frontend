import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuccessSnackbarComponent } from './success-snackbar/success-snackbar.component';
import {MaterialModule} from '../../material/material.module';
import { ErrorSnackbarComponent } from './error-snackbar/error-snackbar.component';
import { OkConfirmationAlertComponent } from './ok-confirmation-alert/ok-confirmation-alert.component';
import { GenericAlertComponent } from './generic-alert/generic-alert.component';
import { RegisterPoolDialogComponent } from './register-pool-dialog/register-pool-dialog.component';
import { InputDialogComponent } from './input-dialog/input-dialog.component';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { RulesDialogComponent } from './rules-dialog/rules-dialog.component';
import { TimeRemainingComponent } from './time-remaining/time-remaining.component';
import { ParticipantsComponent } from './participants/participants.component';
import { GeneratedUrlComponent } from './generated-url/generated-url.component';


@NgModule({
  declarations: [
    SuccessSnackbarComponent,
    ErrorSnackbarComponent,
    OkConfirmationAlertComponent,
    GenericAlertComponent,
    RegisterPoolDialogComponent,
    InputDialogComponent,
    RulesDialogComponent,
    TimeRemainingComponent,
    ParticipantsComponent,
    GeneratedUrlComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MaterialModule,
  ]
})
export class AlertsModule { }
