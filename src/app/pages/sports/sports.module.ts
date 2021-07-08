import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {SportsComponent} from './sports.component';
import { MaterialModule } from '../../material/material.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { AddSportComponent } from './add-sport/add-sport.component';
import { ListOfSportsComponent } from './list-of-sports/list-of-sports.component';
import { EditSportComponent } from './edit-sport/edit-sport.component';



@NgModule({
  declarations: [
    SportsComponent,
    AddSportComponent,
    ListOfSportsComponent,
    EditSportComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    RouterModule.forChild([
      {
        path: '',
        component: SportsComponent
      },
      {
        path: 'add-sport',
        component: AddSportComponent
      },
      {
        path: 'edit-sport/:id',
        component: EditSportComponent
      },
      {
        path: 'list-of-sports',
        component: ListOfSportsComponent
      }
    ])
  ]
})
export class SportsModule { }
