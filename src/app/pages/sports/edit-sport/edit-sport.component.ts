import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AdminService} from '../../../services/admin.service';
import {ActivatedRoute, Router} from '@angular/router';
import {HandleAlertsProvider} from '../../../utilities/providers/handle-alerts-provider';
import {environment} from '../../../../environments/environment';
import {LoaderProvider} from '../../../utilities/providers/loader-provider';

@Component({
  selector: 'app-edit-sport',
  templateUrl: './edit-sport.component.html',
  styleUrls: ['./edit-sport.component.css']
})
export class EditSportComponent implements OnInit {
  currentSport: string;
  sportData: any;
  updateSportForm: FormGroup;
  hide = false;
  imagePath;

  @ViewChild('inputFiles', {static: true}) inputFiles: ElementRef;

  constructor(
    private admin: AdminService,
    private router: Router,
    private route: ActivatedRoute,
    private handleAlertsProvider: HandleAlertsProvider,
    private loaderValue: LoaderProvider,
  ) {
    this.admin.initToken();
    this.imagePath = environment.basePath;
  }

  ngOnInit(): void {
    this.getSportId();
    this.getCurrentSport();
    this.createForm();
  }

  private createForm() {
    this.updateSportForm = new FormGroup({
      name: new FormControl('', Validators.required),
      date_Create: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      id: new FormControl('', Validators.required),
      img: new FormControl(''),
      status: new FormControl('', Validators.required)
    });
  }

  getCurrentSport() {
    this.loaderValue.updateIsloading(true);
    this.admin.getSport(this.currentSport).subscribe(response => {
      this.loaderValue.updateIsloading(false);
      if (response.code === 'D200') {
        this.sportData = response.data;
        this.updateForm();
      } else if (response.code === 'A401' || response.code === 'A302' || response.code === 'A403') {
        this.handleAlertsProvider.presentGenericAlert('Por favor inicie sesion de nuevo...', 'Su Sesion Expiro!');
        this.router.navigate(['/auth']);
      }
    }, err => {
      this.handleAlertsProvider.presentGenericAlert(err);
    });
  }

  getSportId() {
    this.route.params.subscribe(params => {
      this.currentSport = params.id;
    });
  }

  private updateForm() {
    this.updateSportForm.get('name').setValue(this.sportData.name);
    this.updateSportForm.get('description').setValue(this.sportData.descriptios);
    this.updateSportForm.get('date_Create').setValue(this.sportData.date_Create);
    this.updateSportForm.get('img').setValue(this.sportData.img);
    this.updateSportForm.get('id').setValue(this.currentSport);
  }

  updateSport() {
    this.loaderValue.updateIsloading(true);
    const updatedSport = this.updateSportForm.value;
    this.admin.editSport(updatedSport.id, updatedSport.name, updatedSport.date_Create, Number(updatedSport.status),
      updatedSport.description, updatedSport.img).subscribe(response => {
      this.loaderValue.updateIsloading(false);
      if (response.code === 'D200') {
        this.handleAlertsProvider.presentSnackbarSuccess('Se actualizo la informacion con exito!');
        this.router.navigate(['/admin/sports/list-of-sports']);
      } else if (response.code === 'A401' || response.code === 'A302' || response.code === 'A403') {
        this.handleAlertsProvider.presentGenericAlert('Por favor inicie sesion de nuevo...', 'Su Sesion Expiro!');
        this.router.navigate(['/auth']);
      }
    });
  }

  handleUpload(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const imageData = reader.result;
      const imageName = await this.admin.uploadFile(imageData).toPromise();
      this.updateSportForm.get('img').setValue(imageName);
    };
  }

  openUploadFiles() {
    const el: HTMLElement = this.inputFiles.nativeElement as HTMLElement;
    el.click();
  }
}
