import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';
import {HandleAlertsProvider} from '../../../utilities/providers/handle-alerts-provider';
import {ActivatedRoute, Router} from '@angular/router';
import {environment} from '../../../../environments/environment';
import {LoaderProvider} from '../../../utilities/providers/loader-provider';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  loginForm: FormGroup;
  siteKey: string;
  captcha: boolean;
  returnUrl: any;

  constructor(
    private authService: AuthService,
    private handleAlertsProvider: HandleAlertsProvider,
    private router: Router,
    private route: ActivatedRoute,
    private loaderValue: LoaderProvider,
  ) {
    this.siteKey = environment.siteKey;
    this.returnUrl = this.route.snapshot.queryParams.returnUrl;
  }

  ngOnInit() {
    console.log(environment.version);
    this.captcha = environment.captcha === 'prod';
    console.log('captcha', this.captcha);
    this.clearStorage();
    this.route.queryParams.subscribe(params => {
        console.log(params);
        if (params.type) {
          if (params.type === 'activateAccount') {
            this.loaderValue.updateIsloading(true);
            this.authService.activateAccount(params.code).subscribe(data => {
              this.loaderValue.updateIsloading(false);
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
      recaptcha: new FormControl('', this.captcha && Validators.required),
    });
  }

  login() {

    if (this.captcha) {
      if (this.loginForm.value.recaptcha === undefined) {
        this.handleAlertsProvider.presentGenericAlert('Por favor complete el campo de Recaptcha');
      } else {
        const {username, password} = this.loginForm.value;
        this.loaderValue.updateIsloading(true);
        this.authService.login(username, password).subscribe(data => {
          this.loaderValue.updateIsloading(false);
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
            sessionStorage.setItem('img', data.img);
            // localstorage
            localStorage.setItem('token', data.accessToken);
            localStorage.setItem('username', data.username);
            localStorage.setItem('email', data.email);
            localStorage.setItem('id', data.id);
            localStorage.setItem('isAdmin', data.isAdmin);
            localStorage.setItem('money', data.amount);
            localStorage.setItem('coins', data.coins);
            localStorage.setItem('dateCreate', data.createDate);
            localStorage.setItem('img', data.img);
            if (data.isAdmin) {
              this.router.navigate(['/admin']);
            } else {
              console.log('cai aqui!!!,', this.returnUrl);
              if (this.returnUrl) {
                this.router.navigate([this.returnUrl]);
              } else {
                this.router.navigate(['']);
              }
            }
          }
        });
      }
    } else {
      const {username, password} = this.loginForm.value;
      this.loaderValue.updateIsloading(true);
      this.authService.login(username, password).subscribe(data => {
        this.loaderValue.updateIsloading(false);
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
          sessionStorage.setItem('img', data.img);
          // localstorage
          localStorage.setItem('token', data.accessToken);
          localStorage.setItem('username', data.username);
          localStorage.setItem('email', data.email);
          localStorage.setItem('id', data.id);
          localStorage.setItem('isAdmin', data.isAdmin);
          localStorage.setItem('money', data.amount);
          localStorage.setItem('coins', data.coins);
          localStorage.setItem('dateCreate', data.createDate);
          localStorage.setItem('img', data.img);
          if (data.isAdmin) {
            this.router.navigate(['/admin']);
          } else {
            console.log('cai aqui!!!,', this.returnUrl);
            if (this.returnUrl) {
              this.router.navigate([this.returnUrl]);
            } else {
              this.router.navigate(['']);
            }
          }
        }
      });
    }
  }
  // if (!this.captcha){
  //   // && this.loginForm.value.recaptcha !== undefined) {
  //   const { username, password } = this.loginForm.value;
  //   this.loaderValue.updateIsloading(true);
  //   this.authService.login(username, password).subscribe(data => {
  //     this.loaderValue.updateIsloading(false);
  //     if (data.hasError) {
  //       this.handleAlertsProvider.presentGenericAlert('No se ha encontrado el usuario solicitado... intente de nuevo', 'No se Pudo completar la accion...');
  //     } else {
  //       sessionStorage.setItem('token', data.accessToken);
  //       sessionStorage.setItem('username', data.username);
  //       sessionStorage.setItem('email', data.email);
  //       sessionStorage.setItem('id', data.id);
  //       sessionStorage.setItem('isAdmin', data.isAdmin);
  //       sessionStorage.setItem('money', data.amount);
  //       sessionStorage.setItem('coins', data.coins);
  //       sessionStorage.setItem('dateCreate', data.createDate);
  //       sessionStorage.setItem('img', data.img);
  //       if (data.isAdmin) {
  //         this.router.navigate(['/admin']);
  //       } else {
  //         this.router.navigate(['/home']);
  //       }
  //     }
  //   });
  // } else {
  //   this.handleAlertsProvider.presentGenericAlert('Por favor complete el campo de Recaptcha');
  // }


  clearStorage() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('isAdmin');
    sessionStorage.removeItem('money');
    sessionStorage.removeItem('coins');
    sessionStorage.removeItem('dateCreate');
    sessionStorage.removeItem('img');
  }
}
