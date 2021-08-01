import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ListOfPoolsComponent } from './list-of-pools/list-of-pools.component';
import { PoolsResultsComponent } from './pools-results/pools-results.component';
import { PoolCategoryComponent } from './pool-category/pool-category.component';
import { PoolComponent } from './pool/pool.component';
import { PoolsComponent } from './pools/pools.component';
import { SharedModule } from '../../shared/shared.module';
import { MaterialModule } from '../../material/material.module';
import { PoolResultComponent } from './pool-result/pool-result.component';
import { RegisterToPoolComponent } from './register-to-pool/register-to-pool.component';
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    ListOfPoolsComponent,
    PoolsResultsComponent,
    PoolCategoryComponent,
    PoolComponent,
    PoolsComponent,
    PoolResultComponent,
    RegisterToPoolComponent
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
                    path: 'pools-results',
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
                    path: 'pool-result/:id',
                    component: PoolResultComponent
                },
                {
                    path: 'register-to-pool/:id',
                    component: RegisterToPoolComponent
                },
            ]
        ),
        FormsModule
    ]
})
export class PoolsClientModule { }
