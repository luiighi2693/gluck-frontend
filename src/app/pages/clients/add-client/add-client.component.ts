import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HandleAlertsProvider} from '../../../utilities/providers/handle-alerts-provider';
import {AdminService} from '../../../services/admin.service';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
  hide = true;
  newUserForm: FormGroup;
  showLoader = false;
  imagePath;

  @ViewChild('inputFiles', { static: true }) inputFiles: ElementRef;

  constructor(private router: Router, private user: AdminService, private handleAlertsProvider: HandleAlertsProvider,
              private admin: AdminService) {
    this.user.initToken();
    this.imagePath = environment.basePath;
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
      status: new FormControl('', Validators.required),
      img: new FormControl('')
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
      Number(newUser.status),
      newUser.img
    ).subscribe(response => {
      this.showLoader = false;
      if (response.code === 'D200') {
        this.handleAlertsProvider.presentSnackbarSuccess('Se ha creado el usuario con exito!');
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
      this.newUserForm.get('img').setValue(imageName);
    };
  }

  openUploadFiles() {
    const el: HTMLElement = this.inputFiles.nativeElement as HTMLElement;
    el.click();
  }
}
