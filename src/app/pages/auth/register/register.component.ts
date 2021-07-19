import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { HandleAlertsProvider } from '../../../utilities/providers/handle-alerts-provider';
import {AdminService} from '../../../services/admin.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  hide = true;
  isLoaded = false;
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
  imageData = null;

  @ViewChild('inputFiles', { static: true }) inputFiles: ElementRef;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private admin: AdminService,
    private handleAlertsProvider: HandleAlertsProvider,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
  }

  async register() {
    if (this.registerForm.valid) {

      let img = null;

      if (this.imageData !== null) {
       img = await this.admin.uploadFile(this.imageData).toPromise();
      }

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

      this.isLoaded = true;
      this.authService.register(name, lastname, username, password, email, phone, address, state, city, code, img ).subscribe(data => {
        this.isLoaded = false;
        if (data.hasError) {
          this.handleAlertsProvider.presentGenericAlert(data.message, '¡Ha Ocurrido un Error!');
        }
        else {
          this.handleAlertsProvider.presentSnackbarSuccess('Se ha enviado un link de verificacion a su email, por favor revise su bandeja de entrada!');
          this.router.navigate(['']);
        }
      });
    }
  }

  handleUpload(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      // const imageCompressed = await this.compressImage(reader.result, 1200, 600);
      this.imageData = reader.result;
      // this.imageType = event.target.files[0].type;
    };
  }

  openUploadFiles() {
    const el: HTMLElement = this.inputFiles.nativeElement as HTMLElement;
    el.click();
  }

  goBack() {
    this.router.navigate(['/auth']);
  }
}
