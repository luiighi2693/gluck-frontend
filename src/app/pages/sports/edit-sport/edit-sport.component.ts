import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {AdminService} from '../../../services/admin.service';
import {ActivatedRoute, Router} from '@angular/router';
import {HandleAlertsProvider} from '../../../utilities/providers/handle-alerts-provider';

@Component({
  selector: 'app-edit-sport',
  templateUrl: './edit-sport.component.html',
  styleUrls: ['./edit-sport.component.css']
})
export class EditSportComponent implements OnInit {
  getCurrentSport: Subscription;
  currentSport: string;
  sportData: any;
  updateSportForm: FormGroup;
  hide = false;
  showLoader = false;

  constructor(
    private admin: AdminService,
    private router: Router,
    private route: ActivatedRoute,
    private handleAlertsProvider: HandleAlertsProvider,
  ) {
    this.admin.initToken();
  }

  ngOnInit(): void {
    this.createForm();
    this.getCurrentSport =
      this.route.params.subscribe(params => {
        this.currentSport = params.id;
      });

    this.admin.getSport(this.currentSport).subscribe(response => {
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

  private createForm() {
    this.updateSportForm = new FormGroup({
      name: new FormControl('', Validators.required),
      date_Create: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      id: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required )
    });
  }

  private updateForm() {
    this.updateSportForm.get('name').setValue(this.sportData.name);
    this.updateSportForm.get('description').setValue(this.sportData.descriptios);
    this.updateSportForm.get('date_Create').setValue(this.sportData.date_Create);
    this.updateSportForm.get('id').setValue(this.currentSport);
  }

  updateSport() {
    this.showLoader = true;
    const updatedSport = this.updateSportForm.value;
    console.warn(this.updateSportForm.value);
    this.admin.editSport(
      updatedSport.id,
      updatedSport.name,
      updatedSport.date_Create,
      Number(updatedSport.status),
      updatedSport.description
    ).subscribe(response => {
      this.showLoader = false;
      if (response.code === 'D200') {
        this.handleAlertsProvider.presentSnackbarSuccess('Se actualizo la informacion con exito!');
        this.router.navigate(['/admin/sports/list-of-sports']);
      } else if (response.code === 'A401' || response.code === 'A302' || response.code === 'A403') {
        this.handleAlertsProvider.presentGenericAlert('Por favor inicie sesion de nuevo...', 'Su Sesion Expiro!');
        this.router.navigate(['/auth']);
      }
    });
  }
}