import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientBillRoutingModule } from './client-bill-routing.module';
import { ClientBillAllComponent } from './client-bill-all/client-bill-all.component';
import { CreateClientBillComponent } from './create-client-bill/create-client-bill.component';
import { DetailClientBillComponent } from './detail-client-bill/detail-client-bill.component';


@NgModule({
  declarations: [
    ClientBillAllComponent,
    CreateClientBillComponent,
    DetailClientBillComponent
  ],
  imports: [
    CommonModule,
    ClientBillRoutingModule
  ]
})
export class ClientBillModule { }
