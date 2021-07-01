import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuccessSnackbarComponent } from './success-snackbar/success-snackbar.component';
import {MaterialModule} from '../../material/material.module';
import { ErrorSnackbarComponent } from './error-snackbar/error-snackbar.component';
import { OkConfirmationAlertComponent } from './ok-confirmation-alert/ok-confirmation-alert.component';


@NgModule({
  declarations: [
    SuccessSnackbarComponent,
    ErrorSnackbarComponent,
    OkConfirmationAlertComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ]
})
export class AlertsModule { }
