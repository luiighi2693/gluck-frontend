import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import {HandleAlertsProvider} from '../../../utilities/providers/handle-alerts-provider';
import {Router} from '@angular/router';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  hide = true;
  password = '';
  passwordConfirm = '';
  isLoaded = false;

  constructor(private authService: AuthService, private handleAlertsProvider: HandleAlertsProvider, private router: Router) { }

  ngOnInit(): void {
  }

  changePassword() {
    if (this.password === this.passwordConfirm) {
      if (this.password !== '') {
        this.isLoaded = true;
        const code = sessionStorage.getItem('code');
        this.authService.recoverPasswordEnd(code, this.password).subscribe(data => {
          this.isLoaded = false;
          if (data.hasError) {
            this.handleAlertsProvider.presentGenericAlert('No se ha encontrado el usuario solicitado... intente de nuevo', 'No se Pudo completar la accion...');
          }
          else {
            sessionStorage.removeItem('code');
            this.handleAlertsProvider.presentSnackbarSuccess('Se ha cambiado su clave correctamente!');
            this.router.navigate(['/auth']);
          }
        });
      } else {
        alert('debe escribir una clave valida');
      }
    } else {
      alert('Las Claves no Coinciden');
    }
  }
}
