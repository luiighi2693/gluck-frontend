import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {PoolsComponent} from './pools.component';
import { AddPoolComponent } from './add-pool/add-pool.component';
import { ListOfPoolsComponent } from './list-of-pools/list-of-pools.component';
import { MaterialModule } from '../../material/material.module';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { EditPoolComponent } from './edit-pool/edit-pool.component';
import { PoolsResultsDetailComponent } from './pools-results-detail/pools-results-detail.component';
import { MAT_COLOR_FORMATS, NgxMatColorPickerModule, NGX_MAT_COLOR_FORMATS } from '@angular-material-components/color-picker';

@NgModule({
  declarations: [PoolsComponent, AddPoolComponent, ListOfPoolsComponent, EditPoolComponent, PoolsResultsDetailComponent],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMatColorPickerModule,
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
        path: 'edit-pool/:id',
        component: EditPoolComponent
      },
      {
        path: 'pools-results/:id',
        component: PoolsResultsDetailComponent
      },
      {
        path: 'list-of-pools',
        component: ListOfPoolsComponent
      }
    ])
  ],  providers: [
    { provide: MAT_COLOR_FORMATS, useValue: NGX_MAT_COLOR_FORMATS }
  ],
})
export class PoolsModule { }
