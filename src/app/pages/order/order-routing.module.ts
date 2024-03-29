import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateOrderComponent } from './create-order/create-order.component';
import { DetailOrderComponent } from './detail-order/detail-order.component';
import { OrderAllComponent } from './order-all/order-all.component';

const routes: Routes = [
  { path: 'all', component: OrderAllComponent },
  { path: 'create/:_id', component: CreateOrderComponent },
  { path: 'detail/:_id', component: DetailOrderComponent },
  { path: '', redirectTo: 'all', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
