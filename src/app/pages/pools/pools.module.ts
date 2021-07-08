import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {PoolsComponent} from './pools.component';
import { AddPoolComponent } from './add-pool/add-pool.component';
import { ListOfPoolsComponent } from './list-of-pools/list-of-pools.component';



@NgModule({
  declarations: [PoolsComponent, AddPoolComponent, ListOfPoolsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: PoolsComponent
      },
      {
        path: 'add-pool',
        component: AddPoolComponent
      },
      {
        path: 'list-of-pools',
        component: ListOfPoolsComponent
      }
    ])
  ]
})
export class PoolsModule { }
