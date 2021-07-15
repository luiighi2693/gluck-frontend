import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';
import {HandleAlertsProvider} from '../../../utilities/providers/handle-alerts-provider';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  isLoaded = false;
  loginForm: FormGroup;
  siteKey: string;

  constructor(
    private authService: AuthService,
    private handleAlertsProvider: HandleAlertsProvider,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('isAdmin');
    this.route.queryParams.subscribe(params => {
      console.log(params);
      if (params.type) {
        if (params.type === 'activateAccount') {
          this.isLoaded = true;
          this.authService.activateAccount(params.code).subscribe(data => {
            this.isLoaded = false;
            if (data.hasError) {
              this.handleAlertsProvider.presentGenericAlert('No se ha podido activar su cuenta... intente de nuevo', 'No se Pudo completar la accion...');
            } else {
              this.handleAlertsProvider.presentSnackbarSuccess('Se ha activado su cuenta con exito!');
            }
          });
        }
        if (params.type === 'recoveryPassword') {
          sessionStorage.setItem('code', params.code);
          this.router.navigate(['/auth/change-password']);
        }
      }
      }
    );
    this.createForm();
  }

  private createForm() {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  login() {
    const { username, password } = this.loginForm.value;
    this.isLoaded = true;
    this.authService.login(username, password).subscribe(data => {
      this.isLoaded = false;
      if (data.hasError) {
        this.handleAlertsProvider.presentGenericAlert('No se ha encontrado el usuario solicitado... intente de nuevo', 'No se Pudo completar la accion...');
      } else {
        sessionStorage.setItem('token', data.accessToken);
        sessionStorage.setItem('username', data.username);
        sessionStorage.setItem('email', data.email);
        sessionStorage.setItem('id', data.id);
        sessionStorage.setItem('isAdmin', data.isAdmin);
        if (data.isAdmin) {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/home']);
        }
      }
    });
  }
}
