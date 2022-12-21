import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientBillRoutingModule } from './client-bill-routing.module';
import { ClientBillAllComponent, ClientBillAllSelectComponentDialog } from './client-bill-all/client-bill-all.component';
import { CreateClientBillComponent, CreateClientBillComponentDialog } from './create-client-bill/create-client-bill.component';
import { DetailClientBillComponent } from './detail-client-bill/detail-client-bill.component';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { GlobalModule } from '../global/global.module';


@NgModule({
  declarations: [
    ClientBillAllComponent,
    CreateClientBillComponent,
    CreateClientBillComponentDialog,
    ClientBillAllSelectComponentDialog,
    DetailClientBillComponent
  ],
  imports: [
    CommonModule,
    ClientBillRoutingModule,
    FormsModule,
    MatDialogModule,
    GlobalModule
  ]
})
export class ClientBillModule { }
