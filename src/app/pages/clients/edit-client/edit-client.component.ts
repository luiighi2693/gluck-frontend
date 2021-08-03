import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AdminService} from '../../../services/admin.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {Subscription} from 'rxjs';
import { HandleAlertsProvider } from '../../../utilities/providers/handle-alerts-provider';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {
  hide = true;
  getCurrentUser: Subscription;
  currentUser: string;
  userData: any;
  updateUserForm: FormGroup;
  showLoader = false;
  imagePath;

  @ViewChild('inputFiles', { static: true }) inputFiles: ElementRef;

  constructor(
    private user: AdminService,
    private router: Router,
    private route: ActivatedRoute,
    private handleAlertsProvider: HandleAlertsProvider,
    private admin: AdminService,
  ) {
    this.user.initToken();
    this.imagePath = environment.basePath;
  }

  ngOnInit(): void {
    this.createForm();
    this.getCurrentUser =
      this.route.params.subscribe(params => {
      this.currentUser = params.id;
    });

    this.user.getUser(this.currentUser).subscribe(response => {
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
      status: new FormControl('', Validators.required ),
      img: new FormControl('')
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
    this.updateUserForm.get('img').setValue(this.userData.img);
    this.updateUserForm.get('id').setValue(this.currentUser);
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
      Number(updatedUser.status),
    updatedUser.img
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

  handleUpload(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const imageData = reader.result;
      const imageName = await this.admin.uploadFile(imageData).toPromise();
      this.updateUserForm.get('img').setValue(imageName);
    };
  }

  openUploadFiles() {
    const el: HTMLElement = this.inputFiles.nativeElement as HTMLElement;
    el.click();
  }
}
