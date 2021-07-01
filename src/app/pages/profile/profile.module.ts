import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import {RouterModule} from '@angular/router';
import { ProfileFormComponent } from './profile-form/profile-form.component';
import { MaterialModule } from '../../material/material.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

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
    RouterModule.forChild([{path: '', component: ProfileComponent}])
  ]
})
export class ProfileModule { }
