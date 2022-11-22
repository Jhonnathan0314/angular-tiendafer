import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientBillAllComponent } from './client-bill-all/client-bill-all.component';
import { CreateClientBillComponent } from './create-client-bill/create-client-bill.component';
import { DetailClientBillComponent } from './detail-client-bill/detail-client-bill.component';

const routes: Routes = [
  { path: 'all', component: ClientBillAllComponent },
  { path: 'create/:_isPending', component: CreateClientBillComponent },
  { path: 'detail/:_id', component: DetailClientBillComponent },
  { path: '', redirectTo: 'all', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientBillRoutingModule { }
