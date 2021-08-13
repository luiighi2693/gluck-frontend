import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BracketsComponent } from './brackets/brackets.component';
import { MaterialModule } from '../../material/material.module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    BracketsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild([
      {
        path: '',
        component: BracketsComponent,
      }
    ])
  ]
})
export class BracketsModule { }
