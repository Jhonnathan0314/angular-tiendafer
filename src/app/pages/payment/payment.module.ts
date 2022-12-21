import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentRoutingModule } from './payment-routing.module';
import { PaymentAllComponent } from './payment-all/payment-all.component';
import { PaymentClientAllComponent } from './payment-client-all/payment-client-all.component';
import { PaymentClientDetailComponent } from './payment-client-detail/payment-client-detail.component';
import { CreatePaymentComponent } from './create-payment/create-payment.component';
import { FormsModule } from '@angular/forms';
import { GlobalModule } from '../global/global.module';


@NgModule({
  declarations: [
    PaymentAllComponent,
    PaymentClientAllComponent,
    PaymentClientDetailComponent,
    CreatePaymentComponent
  ],
  imports: [
    CommonModule,
    PaymentRoutingModule,
    FormsModule,
    GlobalModule
  ]
})
export class PaymentModule { }
