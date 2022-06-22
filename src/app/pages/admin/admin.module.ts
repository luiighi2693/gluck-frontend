import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminComponent} from './admin.component';
import {RouterModule} from '@angular/router';
import {MaterialModule} from '../../material/material.module';
import {MapComponent} from './map/map.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {EditorModule} from '@tinymce/tinymce-angular';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    AdminComponent,
    MapComponent,
    EditProfileComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    EditorModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: AdminComponent
      },
      {
        path: 'edit-profile',
        component: EditProfileComponent,
      }
    ])
  ]
})
export class AdminModule {
}
