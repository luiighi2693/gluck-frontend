import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AdminService} from '../../../services/admin.service';
import {ActivatedRoute, Router} from '@angular/router';
import {HandleAlertsProvider} from '../../../utilities/providers/handle-alerts-provider';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-edit-team',
  templateUrl: './edit-team.component.html',
  styleUrls: ['./edit-team.component.css']
})
export class EditTeamComponent implements OnInit {
  getCurrentTeam: Subscription;
  currentTeam: string;
  teamData: any;
  updatedTeamForm: FormGroup;
  sports: any;
  hide = false;
  showLoader = false;
  imagePath;

  @ViewChild('inputFiles', { static: true }) inputFiles: ElementRef;

  constructor(
    private admin: AdminService,
    private router: Router,
    private route: ActivatedRoute,
    private handleAlertsProvider: HandleAlertsProvider,
  ) {
    this.admin.initToken();
    this.imagePath = environment.basePath;
  }

  ngOnInit(): void {
    this.createForm();

    this.getCurrentTeam =
      this.route.params.subscribe(params => {
        this.currentTeam = params.id;
      });

    this.admin.getSports().subscribe(response => {
      if (response.code === 'D200') {
        this.sports = response.data;
      }
    });

    this.admin.getTeam(this.currentTeam).subscribe(response => {
      if (response.code === 'D200') {
        this.teamData = response.data;
        console.log(this.teamData);
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

    this.updatedTeamForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      date_Create: new FormControl('', Validators.required),
      asociatedSport: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required),
      id: new FormControl('', Validators.required),
      img: new FormControl('')
    });

  }

  private updateForm() {
    this.updatedTeamForm.get('name').setValue(this.teamData.name);
    this.updatedTeamForm.get('description').setValue(this.teamData.descriptios);
    this.updatedTeamForm.get('date_Create').setValue(this.teamData.date_Create);
    this.updatedTeamForm.get('img').setValue(this.teamData.img);
    this.updatedTeamForm.get('id').setValue(this.currentTeam);
  }

  updateTeam() {
    this.showLoader = true;
    const updatedTeam = this.updatedTeamForm.value;
    console.warn(this.updatedTeamForm.value);
    this.admin.editTeam(
      updatedTeam.id,
      updatedTeam.name,
      updatedTeam.description,
      updatedTeam.date_Create,
      Number(updatedTeam.status),
      updatedTeam.asociatedSport,
      updatedTeam.img
    ).subscribe(response => {
      this.showLoader = false;
      if (response.code === 'D200') {
        this.handleAlertsProvider.presentSnackbarSuccess('Se actualizo la informacion con exito!');
        this.router.navigate(['/admin/teams/list-of-teams']);
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
      this.updatedTeamForm.get('img').setValue(imageName);
    };
  }

  openUploadFiles() {
    const el: HTMLElement = this.inputFiles.nativeElement as HTMLElement;
    el.click();
  }
}
