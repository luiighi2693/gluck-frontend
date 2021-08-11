import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AdminService} from '../../../services/admin.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HandleAlertsProvider} from '../../../utilities/providers/handle-alerts-provider';
import {environment} from '../../../../environments/environment';
import {LoaderProvider} from '../../../utilities/providers/loader-provider';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {
  hide = true;
  currentUser: string;
  userData: any;
  updateUserForm: FormGroup;
  imagePath;

  @ViewChild('inputFiles', {static: true}) inputFiles: ElementRef;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private handleAlertsProvider: HandleAlertsProvider,
    private admin: AdminService,
    private loaderValue: LoaderProvider,
  ) {
    this.admin.initToken();
    this.imagePath = environment.basePath;
  }

  ngOnInit(): void {
    this.createForm();
    this.getCurrentUser();
    this.setUserData();
  }

  getCurrentUser() {
    this.route.params.subscribe(params => {
      this.currentUser = params.id;
    });
  }

  setUserData() {
    this.loaderValue.updateIsloading(true);
    this.admin.getUser(this.currentUser).subscribe(response => {
      this.loaderValue.updateIsloading(false);
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
      status: new FormControl('', Validators.required),
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
    this.loaderValue.updateIsloading(true);
    const updatedUser = this.updateUserForm.value;
    console.warn(this.updateUserForm.value);
    this.admin.editUser(
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
      this.loaderValue.updateIsloading(false);
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
