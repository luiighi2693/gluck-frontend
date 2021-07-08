import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {TeamsComponent} from './teams.component';
import { AddTeamComponent } from './add-team/add-team.component';
import { ListOfTeamsComponent } from './list-of-teams/list-of-teams.component';



@NgModule({
  declarations: [
    AddTeamComponent,
    ListOfTeamsComponent
  ],
  imports: [
    CommonModule,
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
        path: 'list-of-teams',
        component: ListOfTeamsComponent
      }
    ])
  ]
})
export class TeamsModule { }
