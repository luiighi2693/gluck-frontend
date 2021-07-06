import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { HandleAlertsProvider } from '../../../utilities/providers/handle-alerts-provider';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  isLoaded = false;
  loginForm = this.fb.group({
    userName: ['', Validators.required],
    password: ['', Validators.required],
    // recaptcha: ['', Validators.required],
  });
  siteKey: string;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private handleAlertsProvider: HandleAlertsProvider,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  login() {
    const username = this.loginForm.value.userName;
    const password = this.loginForm.value.password;
    this.isLoaded = true;
    this.authService.login(username, password).subscribe(data => {
      this.isLoaded = false;
      if (data.hasError) {
        this.handleAlertsProvider.presentSnackbarError('No se ha encontrado el usuario solicitado... intente de nuevo ')
      }
      else {
        this.router.navigate(['/home']);
        this.handleAlertsProvider.presentSnackbarSuccess('Bienvenido!');
      }
    });
  }
}
