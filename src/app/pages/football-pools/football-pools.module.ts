import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {FootballPoolsComponent} from './football-pools.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([{path: '', component: FootballPoolsComponent}])
  ]
})
export class FootballPoolsModule { }
