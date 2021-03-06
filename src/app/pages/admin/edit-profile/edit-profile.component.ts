import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AdminService} from '../../../services/admin.service';
import {ActivatedRoute, Router} from '@angular/router';
import {HandleAlertsProvider} from '../../../utilities/providers/handle-alerts-provider';
import {environment} from '../../../../environments/environment';
import {LoaderProvider} from '../../../utilities/providers/loader-provider';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit, AfterViewInit {
  hide = true;
  userData: any;
  updateUserForm: FormGroup;
  id = '';
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
    this.id = sessionStorage.getItem('id');
    this.createForm();
    this.setUserData();
  }

  ngAfterViewInit() {

  }

  setUserData() {
    this.admin.getUser(this.id).subscribe(response => {
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
    this.updateUserForm.get('password').setValue(this.userData.password);
    this.updateUserForm.get('lastname').setValue(this.userData.lastname);
    this.updateUserForm.get('email').setValue(this.userData.email);
    this.updateUserForm.get('phone').setValue(this.userData.phone);
    this.updateUserForm.get('address').setValue(this.userData.address);
    this.updateUserForm.get('state').setValue(this.userData.state);
    this.updateUserForm.get('status').setValue(this.userData.status);
    this.updateUserForm.get('city').setValue(this.userData.city);
    this.updateUserForm.get('code').setValue(this.userData.code);
    this.updateUserForm.get('img').setValue(this.userData.img);
    this.updateUserForm.get('id').setValue(this.id);
  }

  updateUser() {
    this.loaderValue.updateIsloading(true);
    const {name, lastname, username, email, phone, password, address, state, city, code, id, status, img} = this.updateUserForm.value;
    this.admin.editUser(name, lastname, username, email, phone, password, address, state, city, code, id, Number(status), img
    ).subscribe(response => {
      this.loaderValue.updateIsloading(false);
      if (response.code === 'D200') {
        this.handleAlertsProvider.presentSnackbarSuccess('Se actualizo la informacion con exito!');
        sessionStorage.setItem('img', img);
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
      console.log('inicia la lecutra');
      this.loaderValue.updateIsloading(true);
      const imageData = reader.result;
      const imageName = await this.admin.uploadFile(imageData).toPromise();
      if (imageName) {
        console.log('el elemento esta cargado');
        setTimeout(() => {
          this.loaderValue.updateIsloading(false);
        }, 3000);
      }
      this.updateUserForm.get('img').setValue(imageName);
    };
  }

  openUploadFiles() {
    const el: HTMLElement = this.inputFiles.nativeElement as HTMLElement;
    el.click();
  }
}
