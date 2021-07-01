import {Component, OnInit} from '@angular/core';
import { HandleAlertsProvider } from '../../../utilities/providers/handle-alerts-provider';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  hide = true;

  constructor(
    private handleAlertsProvider: HandleAlertsProvider
  ) {
  }

  ngOnInit(): void {
  }

  sendPassword() {
    this.handleAlertsProvider.presentSnackbarSuccess('Se ha enviado el el link de cambio de contrasena a su correo!');
  }
}
