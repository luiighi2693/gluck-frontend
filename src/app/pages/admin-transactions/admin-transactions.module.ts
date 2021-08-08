import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminTransactionsComponent } from './admin-transactions/admin-transactions.component';
import {RouterModule} from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { MaterialModule } from '../../material/material.module';

@NgModule({
  declarations: [
    AdminTransactionsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    RouterModule.forChild([
      {
        path: '',
        component: AdminTransactionsComponent,
      }
    ])
  ]
})
export class AdminTransactionsModule { }
