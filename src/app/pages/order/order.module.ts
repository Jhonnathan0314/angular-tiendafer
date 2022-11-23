import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { OrderAllComponent, OrderAllSelectComponentDialog } from './order-all/order-all.component';
import { CreateOrderComponent, CreateOrderComponentDialog } from './create-order/create-order.component';
import { DetailOrderComponent } from './detail-order/detail-order.component';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    OrderAllComponent,
    CreateOrderComponent,
    CreateOrderComponentDialog,
    OrderAllSelectComponentDialog,
    DetailOrderComponent
  ],
  imports: [
    CommonModule,
    OrderRoutingModule,
    FormsModule,
    MatDialogModule
  ]
})
export class OrderModule { }
