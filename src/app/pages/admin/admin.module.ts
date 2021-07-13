import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../material/material.module';
import { MapComponent } from './map/map.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { EditorModule } from '@tinymce/tinymce-angular';

@NgModule({
  declarations: [
    AdminComponent,
    MapComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    EditorModule,
    RouterModule.forChild([{path: '', component: AdminComponent}])
  ]
})
export class AdminModule { }
