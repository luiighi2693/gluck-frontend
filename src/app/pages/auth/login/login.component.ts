import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';
import {HandleAlertsProvider} from '../../../utilities/providers/handle-alerts-provider';
import {ActivatedRoute, Router} from '@angular/router';
import { environment } from '../../../../environments/environment';

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
    this.siteKey = environment.siteKey;
  }

  ngOnInit() {
    this.clearStorage();
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
      password: new FormControl('', Validators.required),
      recaptcha: new FormControl(''),
    });
  }

  login() {
    const { username, password } = this.loginForm.value;
    this.isLoaded = true;
    this.authService.login(username, password).subscribe(data => {
      console.log(data);
      this.isLoaded = false;
      if (data.hasError) {
        this.handleAlertsProvider.presentGenericAlert('No se ha encontrado el usuario solicitado... intente de nuevo', 'No se Pudo completar la accion...');
      } else {
        sessionStorage.setItem('token', data.accessToken);
        sessionStorage.setItem('username', data.username);
        sessionStorage.setItem('email', data.email);
        sessionStorage.setItem('id', data.id);
        sessionStorage.setItem('isAdmin', data.isAdmin);
        sessionStorage.setItem('money', data.amount);
        sessionStorage.setItem('coins', data.coins);
        sessionStorage.setItem('dateCreate', data.createDate);
        if (data.isAdmin) {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/home']);
        }
      }
    });
  }

  clearStorage() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('isAdmin');
    sessionStorage.removeItem('money');
    sessionStorage.removeItem('coins');
    sessionStorage.removeItem('dateCreate');
  }
}
