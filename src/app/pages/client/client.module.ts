import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { ClientAllComponent } from './client-all/client-all.component';
import { CreateClientComponent } from './create-client/create-client.component';
import { UpdateClientComponent } from './update-client/update-client.component';
import { FormsModule } from '@angular/forms';
import { GlobalModule } from '../global/global.module';


@NgModule({
  declarations: [
    ClientAllComponent,
    CreateClientComponent,
    UpdateClientComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    FormsModule,
    GlobalModule
  ]
})
export class ClientModule { }
