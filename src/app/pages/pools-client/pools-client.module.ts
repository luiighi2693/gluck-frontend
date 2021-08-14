import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {ListOfPoolsComponent} from './list-of-pools/list-of-pools.component';
import {PoolsResultsComponent} from './pools-results/pools-results.component';
import {PoolCategoryComponent} from './pool-category/pool-category.component';
import {PoolComponent} from './pool/pool.component';
import {PoolsComponent} from './pools/pools.component';
import {SharedModule} from '../../shared/shared.module';
import {MaterialModule} from '../../material/material.module';
import {MyResultsComponent} from './my-results/my-results.component';
import {RegisterToPoolComponent} from './register-to-pool/register-to-pool.component';
import {FormsModule} from '@angular/forms';
import {PoolRegisterComponent} from './pool-register/pool-register.component';
import {MyPoolsComponent} from './my-pools/my-pools.component';
import {BracketsComponent} from './brackets/brackets.component';

@NgModule({
  declarations: [
    ListOfPoolsComponent,
    PoolsResultsComponent,
    PoolCategoryComponent,
    PoolComponent,
    PoolsComponent,
    MyResultsComponent,
    RegisterToPoolComponent,
    PoolRegisterComponent,
    MyPoolsComponent,
    BracketsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    RouterModule.forChild([
        {
          path: '',
          component: PoolsComponent
        },
        {
          path: 'list-of-pools',
          component: ListOfPoolsComponent
        },
        {
          path: 'pools-results/:id',
          component: PoolsResultsComponent
        },
        {
          path: 'pool-category/:id',
          component: PoolCategoryComponent
        },
        {
          path: 'pool/:id',
          component: PoolComponent
        },
        {
          path: 'my-results/:id',
          component: MyResultsComponent
        },
        {
          path: 'register-to-pool/:id',
          component: RegisterToPoolComponent
        },
        {
          path: 'pool-register/:id',
          component: PoolRegisterComponent
        },
        {
          path: 'my-pools',
          component: MyPoolsComponent
        },
      {
        path: 'ranking',
        component: BracketsComponent,
      }
      ]
    ),
    FormsModule
  ]
})
export class PoolsClientModule {
}
