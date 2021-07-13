import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../material/material.module';


@NgModule({
  declarations: [
    AdminComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild([{path: '', component: AdminComponent}])
  ]
})
export class AdminModule { }
