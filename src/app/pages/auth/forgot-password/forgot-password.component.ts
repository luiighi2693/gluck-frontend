import {Component, OnInit} from '@angular/core';
import { HandleAlertsProvider } from '../../../utilities/providers/handle-alerts-provider';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  hide = true;
  email = '';
  isLoaded = false;

  constructor(
    private authService: AuthService, private handleAlertsProvider: HandleAlertsProvider, private router: Router
  ) {
  }

  ngOnInit(): void {
  }

  sendPassword() {
    if (this.email !== '') {
      this.isLoaded = true;
      this.authService.recoverPasswordInit(this.email).subscribe(data => {
        this.isLoaded = false;
        if (data.hasError) {
          this.handleAlertsProvider.presentGenericAlert('No se ha encontrado el correo  solicitado... intente de nuevo', 'No se Pudo completar la accion...');
        }
        else {
          this.handleAlertsProvider.presentSnackbarSuccess('Se ha enviado el link de cambio de contrasena a su correo!');
          this.router.navigate(['/auth']);
        }
      });
    } else {
      alert('debe ingresar un correo valido');
    }
  }
}
