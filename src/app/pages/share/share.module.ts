import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareComponent } from './share.component';
import {MaterialModule} from '../../material/material.module';
import {SharedModule} from '../../shared/shared.module';
import {RouterModule} from '@angular/router';



@NgModule({
  declarations: [ShareComponent],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    RouterModule.forChild([
      {path: '', component: ShareComponent},
    ])
  ]
})
export class ShareModule { }
