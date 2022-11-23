import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePaymentComponent } from './create-payment/create-payment.component';
import { PaymentAllComponent } from './payment-all/payment-all.component';
import { PaymentClientAllComponent } from './payment-client-all/payment-client-all.component';
import { PaymentClientDetailComponent } from './payment-client-detail/payment-client-detail.component';

const routes: Routes = [
  { path: 'all', component: PaymentAllComponent },
  { path: 'create/:_id', component: CreatePaymentComponent },
  { path: 'client/all/:_id', component: PaymentClientAllComponent },
  { path: 'client/detail/:_idClient/:_idBill', component: PaymentClientDetailComponent },
  { path: '', redirectTo: 'all', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentRoutingModule { }
