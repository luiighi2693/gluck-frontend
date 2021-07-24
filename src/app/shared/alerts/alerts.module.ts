import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuccessSnackbarComponent } from './success-snackbar/success-snackbar.component';
import {MaterialModule} from '../../material/material.module';
import { ErrorSnackbarComponent } from './error-snackbar/error-snackbar.component';
import { OkConfirmationAlertComponent } from './ok-confirmation-alert/ok-confirmation-alert.component';
import { GenericAlertComponent } from './generic-alert/generic-alert.component';
import { RegisterPoolDialogComponent } from './register-pool-dialog/register-pool-dialog.component';


@NgModule({
  declarations: [
    SuccessSnackbarComponent,
    ErrorSnackbarComponent,
    OkConfirmationAlertComponent,
    GenericAlertComponent,
    RegisterPoolDialogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ]
})
export class AlertsModule { }
