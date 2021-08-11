import {Component, OnInit} from '@angular/core';
import {HandleAlertsProvider} from '../../../utilities/providers/handle-alerts-provider';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';
import {LoaderProvider} from '../../../utilities/providers/loader-provider';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  hide = true;
  forgotPasswordForm: FormGroup;

  constructor(
    private authService: AuthService,
    private handleAlertsProvider: HandleAlertsProvider,
    private router: Router,
    private fb: FormBuilder,
    private loaderValue: LoaderProvider,
  ) {
  }

  ngOnInit(): void {
    this.createForm();
  }

  private createForm() {
    this.forgotPasswordForm = this.fb.group({
      email: ['', Validators.required],
    });
  }

  sendPassword() {
    this.loaderValue.updateIsloading(true);
    this.authService.recoverPasswordInit(this.forgotPasswordForm.value.email).subscribe(data => {
      this.loaderValue.updateIsloading(false);
      if (data.hasError) {
        this.handleAlertsProvider.presentGenericAlert('No se ha encontrado el correo  solicitado... intente de nuevo', 'No se Pudo completar la accion...');
      } else {
        this.handleAlertsProvider.presentSnackbarSuccess('Se ha enviado el link de cambio de contrasena a su correo!');
        this.router.navigate(['/auth']);
      }
    });
  }
}
