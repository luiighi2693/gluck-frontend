import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HandleAlertsProvider} from '../../../utilities/providers/handle-alerts-provider';
import {AdminService} from '../../../services/admin.service';

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.css']
})
export class AddTeamComponent implements OnInit {
  hide = false;
  newTeamForm: FormGroup;
  showLoader = false;
  sports: any;

  constructor(private router: Router, private admin: AdminService, private handleAlertsProvider: HandleAlertsProvider) {
  }

  ngOnInit(): void {
    this.getSports();
  }

  private createForm() {
    this.newTeamForm = new FormGroup({
      name: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      date_Create: new FormControl('', Validators.required),
      asociatedSport: new FormControl('', Validators.required)
    });
  }

  createNewTeam() {
    this.showLoader = true;
    const newTeam = this.newTeamForm.value;
    console.warn(this.newTeamForm.value);
    this.admin.createTeam(
      newTeam.name,
      newTeam.description,
      newTeam.date_Create,
      Number(newTeam.status),
      newTeam.asociatedSport
    ).subscribe(response => {
      this.showLoader = false;
      if (response.code === 'D200') {
        this.handleAlertsProvider.presentSnackbarSuccess('Se ha creado el usuario con exito!');
        this.router.navigate(['/admin/teams/list-of-teams']);
      }
    });
  }

  getSports() {
    this.admin.getSports().subscribe(response => {
      if (response.code === 'D200') {
        this.sports = response.data;
      }
    });
    this.createForm();
  }

}
