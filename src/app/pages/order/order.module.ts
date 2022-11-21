import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { OrderAllComponent } from './order-all/order-all.component';
import { CreateOrderComponent } from './create-order/create-order.component';
import { DetailOrderComponent } from './detail-order/detail-order.component';


@NgModule({
  declarations: [
    OrderAllComponent,
    CreateOrderComponent,
    DetailOrderComponent
  ],
  imports: [
    CommonModule,
    OrderRoutingModule
  ]
})
export class OrderModule { }
