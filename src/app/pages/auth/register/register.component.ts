import {Component, OnInit} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { HandleAlertsProvider } from '../../../utilities/providers/handle-alerts-provider';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  hide = true;
  registerForm = this.fb.group({
    name: ['', Validators.required],
    lastname: ['', Validators.required],
    username: ['', Validators.required],
    password: ['', Validators.required],
    email: ['', Validators.required],
    phone: ['', Validators.required],
    address: ['', Validators.required],
    city: ['', Validators.required],
    state: ['', Validators.required],
    code: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private handleAlertsProvider: HandleAlertsProvider,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
  }

  register() {
    const username = this.registerForm.value.username;
    const password = this.registerForm.value.password;
    const email = this.registerForm.value.email;
    const name = this.registerForm.value.name;
    const lastname = this.registerForm.value.lastname;
    const phone = this.registerForm.value.phone;
    const address = this.registerForm.value.address;
    const city = this.registerForm.value.city;
    const state = this.registerForm.value.state;
    const code = this.registerForm.value.code;
    this.authService.register(name, lastname, username, password, email, phone, address, state, city, code ).subscribe(data => {
      if (data.hasError) {
        this.handleAlertsProvider.presentSnackbarError(data.message);
      }
      else {
        this.handleAlertsProvider.presentSnackbarSuccess('Se ha enviado un link de verificacion a su email, por favor revise su bandeja de entrada!');
        this.router.navigate(['']);
      }
    });
  }

}
