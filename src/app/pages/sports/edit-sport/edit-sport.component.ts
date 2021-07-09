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
  ) { }

  ngOnInit(): void {
    this.getCurrentSport =
      this.route.params.subscribe(params => {
        this.currentSport = params.id;
      });

    this.admin.getSport(this.currentSport).subscribe(response => {
      if (response.code === 'D200') {
        this.sportData = response.data;
        this.createForm();
      } else {
        alert('ha ocurrido un error!');
      }
    }, err => {
      console.error(err);
    });
  }

  private createForm() {
    this.updateSportForm = new FormGroup({
      name: new FormControl(this.sportData.name, Validators.required),
      date_Create: new FormControl(this.sportData.date_Create, Validators.required),
      description: new FormControl(this.sportData.descriptios, Validators.required),
      id: new FormControl(this.currentSport, Validators.required),
      status: new FormControl('', Validators.required )
    });

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
      } else {
        this.handleAlertsProvider.presentGenericAlert('Por Favor intentalo en unos minutos...' , 'Ha ocurrido un error!');
      }
    });
  }
}
