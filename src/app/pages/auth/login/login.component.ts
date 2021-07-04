import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  loginForm = this.fb.group({
    userName: ['', Validators.required],
    password: ['', Validators.required],
    // recaptcha: ['', Validators.required],
  });
  siteKey: string;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  login() {
    alert(this.loginForm.status);
  }
}
