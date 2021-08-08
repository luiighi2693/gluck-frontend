import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TransactionsComponent } from './transactions/transactions.component';
import { MaterialModule } from '../../material/material.module';
import { SharedModule } from '../../shared/shared.module';



@NgModule({
  declarations: [
    TransactionsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    RouterModule.forChild([
      {
        path: '',
        component: TransactionsComponent
      }
    ])
  ]
})
export class TransactionsModule { }
