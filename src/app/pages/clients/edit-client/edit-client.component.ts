import { Component, OnInit } from '@angular/core';
import {AdminService} from '../../../services/admin.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {Subscription} from 'rxjs';
import { HandleAlertsProvider } from '../../../utilities/providers/handle-alerts-provider';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {
  hide = false;
  getCurrentUser: Subscription;
  currentUser: string;
  userData: any;
  updateUserForm: FormGroup;
  showLoader = false;

  constructor(
    private user: AdminService,
    private router: Router,
    private route: ActivatedRoute,
    private handleAlertsProvider: HandleAlertsProvider,
  ) {
    this.user.initToken();
  }

  ngOnInit(): void {
    this.getCurrentUser =
      this.route.params.subscribe(params => {
      this.currentUser = params.id;
    });

    this.user.getUser(this.currentUser).subscribe(response => {
      if (response.code === 'D200') {
        this.userData = response.data;
        this.createForm();
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
      username: new FormControl(this.userData.username, Validators.required),
      name: new FormControl(this.userData.name, Validators.required),
      lastname: new FormControl(this.userData.lastname, Validators.required),
      email: new FormControl(this.userData.email, Validators.required),
      password: new FormControl(this.userData.password, Validators.required),
      phone: new FormControl(this.userData.phone, Validators.required),
      address: new FormControl(this.userData.address, Validators.required),
      state: new FormControl(this.userData.state, Validators.required),
      city: new FormControl(this.userData.city, Validators.required),
      code: new FormControl(this.userData.code, Validators.required),
      id: new FormControl(this.currentUser, Validators.required),
      status: new FormControl('', Validators.required )
    });

  }

  updateUser() {
    this.showLoader = true;
    const updatedUser = this.updateUserForm.value;
    console.warn(this.updateUserForm.value);
    this.user.editUser(
      updatedUser.name,
      updatedUser.lastname,
      updatedUser.username,
      updatedUser.email,
      updatedUser.phone,
      updatedUser.password,
      updatedUser.address,
      updatedUser.state,
      updatedUser.city,
      updatedUser.code,
      updatedUser.id,
      Number(updatedUser.status)
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
