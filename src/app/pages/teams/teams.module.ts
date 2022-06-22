import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {TeamsComponent} from './teams.component';
import { AddTeamComponent } from './add-team/add-team.component';
import { ListOfTeamsComponent } from './list-of-teams/list-of-teams.component';
import { EditTeamComponent } from './edit-team/edit-team.component';
import { MaterialModule } from '../../material/material.module';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    TeamsComponent,
    AddTeamComponent,
    ListOfTeamsComponent,
    EditTeamComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: TeamsComponent
      },
      {
        path: 'add-team',
        component: AddTeamComponent
      },
      {
        path: 'edit-team/:id',
        component: EditTeamComponent
      },
      {
        path: 'list-of-teams',
        component: ListOfTeamsComponent
      }
    ])
  ]
})
export class TeamsModule { }
