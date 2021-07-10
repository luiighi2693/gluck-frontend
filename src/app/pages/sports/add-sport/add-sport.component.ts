import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HandleAlertsProvider} from '../../../utilities/providers/handle-alerts-provider';
import {AdminService} from '../../../services/admin.service';

@Component({
  selector: 'app-add-sport',
  templateUrl: './add-sport.component.html',
  styleUrls: ['./add-sport.component.css']
})
export class AddSportComponent implements OnInit {
  hide = false;
  newSportForm: FormGroup;
  showLoader = false;

  constructor(private router: Router, private admin: AdminService, private handleAlertsProvider: HandleAlertsProvider) {
    this.admin.initToken();
  }

  ngOnInit(): void {
    this.createForm();
  }

  private createForm() {
    this.newSportForm = new FormGroup({
      name: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      date_Create: new FormControl('', Validators.required)
    });
  }

  createNewSport() {
    this.showLoader = true;
    const newSport = this.newSportForm.value;
    console.warn(this.newSportForm.value);
    this.admin.createSport(
      newSport.name,
      newSport.description,
      newSport.date_Create,
      Number(newSport.status)
    ).subscribe(response => {
      this.showLoader = false;
      if (response.code === 'D200') {
        this.handleAlertsProvider.presentSnackbarSuccess('Se ha creado el usuario con exito!');
        this.router.navigate(['/admin/sports/list-of-sports']);
      } else if (response.code === 'A401' || response.code === 'A302' || response.code === 'A403') {
        this.handleAlertsProvider.presentGenericAlert('Por favor inicie sesion de nuevo...', 'Su Sesion Expiro!');
        this.router.navigate(['/auth']);
      }
    }, err => {
      this.handleAlertsProvider.presentGenericAlert(err);
    });
  }

}
