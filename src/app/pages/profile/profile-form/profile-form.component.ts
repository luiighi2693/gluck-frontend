import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {AdminService} from '../../../services/admin.service';
import {HandleAlertsProvider} from '../../../utilities/providers/handle-alerts-provider';
import {Router} from '@angular/router';
import {LoaderProvider} from '../../../utilities/providers/loader-provider';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.css'],
})
export class ProfileFormComponent implements OnInit {

  updateProfileForm: FormGroup;
  hide = true;
  userData = null;
  id: string;
  imagePath;

  @ViewChild('inputFiles', {static: true}) inputFiles: ElementRef;

  constructor(
    private admin: AdminService,
    private handleAlertsProvider: HandleAlertsProvider,
    private router: Router,
    private loaderValue: LoaderProvider,
  ) {
    this.admin.initToken();
    this.imagePath = environment.basePath;
  }

  ngOnInit(): void {
    this.id = localStorage.getItem('id');
    this.createForm();
    this.getCurrentUser();
  }

  private createForm() {
    this.updateProfileForm = new FormGroup({
      rowid: new FormControl(null, Validators.required),
      type: new FormControl(null, Validators.required),
      fk_sport: new FormControl(null, Validators.required),
      img: new FormControl(''),
      ranking: new FormControl(''),
      date_Access: new FormControl(null, Validators.required),
      date_Create: new FormControl(null, Validators.required),
      contador: new FormControl(null, Validators.required),
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
      status_code: new FormControl(''),
      amount: new FormControl(''),
      coins: new FormControl(''),
      status: new FormControl('')
    });
  }

  getCurrentUser() {
    this.loaderValue.updateIsloading(true);
    this.admin.getUser(this.id).subscribe(response => {
      this.loaderValue.updateIsloading(false);
      if (response.code === 'D200') {
        this.userData = response.data;
        this.updateProfileForm.setValue(this.userData);
      } else if (response.code === 'A401' || response.code === 'A302' || response.code === 'A403') {
        this.handleAlertsProvider.presentGenericAlert('Por favor inicie sesion de nuevo...', 'Su Sesion Expiro!');
        this.router.navigate(['/auth']);
      }
    }, err => {
      this.handleAlertsProvider.presentGenericAlert(err);
    });
  }

  submitForm() {
    const { rowid, type, fk_sport, img, ranking, date_Access, date_Create, contador, username,
      name, lastname, password, email, phone, address, state, city, code, status} = this.updateProfileForm.value;
    this.loaderValue.updateIsloading(true);
    this.admin.editUser(name, lastname, username, email, phone, password, address, state, city, code, rowid, status, img).subscribe(res => {
      this.loaderValue.updateIsloading(false);
      if (res.code === 'D200') {
        this.handleAlertsProvider.presentSnackbarSuccess('Se actualizaron los datos con exito!');
        localStorage.setItem('img', img);
        this.router.navigate(['/']);
      } else if (res.code === 'A401' || res.code === 'A302' || res.code === 'A403') {
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
      console.log('inicia la carga');
      this.loaderValue.updateIsloading(true);
      const imageData = reader.result;
      const imageName = await this.admin.uploadFile(imageData).toPromise();
      if (imageName) {
        console.log('el elemento esta cargado');
        setTimeout(() => {
          this.loaderValue.updateIsloading(false);
        }, 3000);
      }
      this.updateProfileForm.get('img').setValue(imageName);
    };
  }

  openUploadFiles() {
    const el: HTMLElement = this.inputFiles.nativeElement as HTMLElement;
    el.click();
  }
}
