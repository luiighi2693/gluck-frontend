import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import {RouterModule} from '@angular/router';
import { ProfileFormComponent } from './profile-form/profile-form.component';
import { MaterialModule } from '../../material/material.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  declarations: [
    ProfileComponent,
    ProfileFormComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([{path: '', component: ProfileComponent}]),
    SharedModule
  ]
})
export class ProfileModule { }
