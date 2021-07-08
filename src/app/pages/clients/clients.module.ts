import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {ClientsComponent} from './clients.component';
import { AddClientComponent } from './add-client/add-client.component';
import { ListOfClientsComponent } from './list-of-clients/list-of-clients.component';
import { MaterialModule } from '../../material/material.module';
import { SharedModule } from '../../shared/shared.module';
import { EditClientComponent } from './edit-client/edit-client.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ClientsComponent,
    AddClientComponent,
    ListOfClientsComponent,
    EditClientComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: ClientsComponent
      },
      {
        path: 'add-client',
        component: AddClientComponent
      },
      {
        path: 'edit-client/:id',
        component: EditClientComponent
      },
      {
        path: 'list-of-clients',
        component: ListOfClientsComponent
      }
    ])
  ]
})
export class ClientsModule { }
