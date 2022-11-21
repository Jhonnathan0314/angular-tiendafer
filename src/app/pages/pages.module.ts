import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { ClientModule } from './client/client.module';
import { ClientBillModule } from './client-bill/client-bill.module';
import { OrderModule } from './order/order.module';
import { PaymentModule } from './payment/payment.module';
import { ProductModule } from './product/product.module';
import { SectionModule } from './section/section.module';
import { SupplierModule } from './supplier/supplier.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PagesRoutingModule,
    ClientModule,
    ClientBillModule,
    OrderModule,
    PaymentModule,
    ProductModule,
    SectionModule,
    SupplierModule
  ]
})
export class PagesModule { }
