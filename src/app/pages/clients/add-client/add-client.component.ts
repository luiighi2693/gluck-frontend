import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HandleAlertsProvider} from '../../../utilities/providers/handle-alerts-provider';
import {AdminService} from '../../../services/admin.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
  hide = false;
  newUserForm: FormGroup;
  showLoader = false;

  constructor(private router: Router, private user: AdminService, private handleAlertsProvider: HandleAlertsProvider) {
  }

  ngOnInit(): void {
    this.createForm();
  }

  private createForm() {
    this.newUserForm = new FormGroup({
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
      status: new FormControl('', Validators.required)
    });
  }

  createNewUser() {
    this.showLoader = true;
    const newUser = this.newUserForm.value;
    console.warn(this.newUserForm.value);
    this.user.createUser(
      newUser.name,
      newUser.lastname,
      newUser.username,
      newUser.email,
      newUser.phone,
      newUser.password,
      newUser.address,
      newUser.state,
      newUser.city,
      newUser.code,
      Number(newUser.status)
    ).subscribe(response => {
      this.showLoader = false;
      if (response.code === 'D200') {
        this.handleAlertsProvider.presentSnackbarSuccess('Se ha creado el usuario con exito!');
        this.router.navigate(['/admin/clients/list-of-clients']);
      }
    });
  }
}
