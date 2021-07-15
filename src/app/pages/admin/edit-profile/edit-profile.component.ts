import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AdminService} from '../../../services/admin.service';
import {ActivatedRoute, Router} from '@angular/router';
import {HandleAlertsProvider} from '../../../utilities/providers/handle-alerts-provider';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  hide = false;
  getCurrentUser: Subscription;
  userData: any;
  updateUserForm: FormGroup;
  showLoader = false;
  id = '';

  constructor(
    private user: AdminService,
    private router: Router,
    private route: ActivatedRoute,
    private handleAlertsProvider: HandleAlertsProvider,
  ) {
    this.user.initToken();
  }

  ngOnInit(): void {
    this.id = sessionStorage.getItem('id');
    this.createForm();

    this.user.getUser(this.id).subscribe(response => {
      if (response.code === 'D200') {
        this.userData = response.data;
        this.updateForm();
      } else if (response.code === 'A401' || response.code === 'A302' || response.code === 'A403') {
        this.handleAlertsProvider.presentGenericAlert('Por favor inicie sesion de nuevo...', 'Su Sesion Expiro!');
        this.router.navigate(['/auth']);
      }
    }, err => {
      this.handleAlertsProvider.presentGenericAlert(err);
    });
  }

  private createForm() {
    this.updateUserForm = new FormGroup({
      username: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      code: new FormControl('', Validators.required),
      id: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required )
    });
  }

  private updateForm() {
    this.updateUserForm.get('username').setValue(this.userData.username);
    this.updateUserForm.get('name').setValue(this.userData.name);
    this.updateUserForm.get('lastname').setValue(this.userData.lastname);
    this.updateUserForm.get('email').setValue(this.userData.email);
    this.updateUserForm.get('phone').setValue(this.userData.phone);
    this.updateUserForm.get('address').setValue(this.userData.address);
    this.updateUserForm.get('state').setValue(this.userData.state);
    this.updateUserForm.get('state').setValue(this.userData.state);
    this.updateUserForm.get('city').setValue(this.userData.city);
    this.updateUserForm.get('code').setValue(this.userData.code);
    this.updateUserForm.get('id').setValue(this.id);
  }

  updateUser() {
    this.showLoader = true;
    const { name, lastname, username, email, phone, password, address, state, city, code, id, status } = this.updateUserForm.value;
    console.warn(this.updateUserForm.value);
    this.user.editUser(name, lastname, username, email, phone, password, address, state, city, code, id, Number(status)
    ).subscribe(response => {
      this.showLoader = false;
      if (response.code === 'D200') {
        this.handleAlertsProvider.presentSnackbarSuccess('Se actualizo la informacion con exito!');
        this.router.navigate(['/admin/clients/list-of-clients']);
      } else if (response.code === 'A401' || response.code === 'A302' || response.code === 'A403') {
        this.handleAlertsProvider.presentGenericAlert('Por favor inicie sesion de nuevo...', 'Su Sesion Expiro!');
        this.router.navigate(['/auth']);
      }
    }, err => {
      this.handleAlertsProvider.presentGenericAlert(err);
    });
  }
}
