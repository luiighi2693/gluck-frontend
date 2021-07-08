import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {SportsComponent} from './sports.component';
import { AddSportComponent } from './add-sport/add-sport.component';
import { ListOfSportsComponent } from './list-of-sports/list-of-sports.component';



@NgModule({
  declarations: [
    SportsComponent,
    AddSportComponent,
    ListOfSportsComponent
  ],
  imports: [
    CommonModule,
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
        path: 'list-of-sports',
        component: ListOfSportsComponent
      }
    ])
  ]
})
export class SportsModule { }
