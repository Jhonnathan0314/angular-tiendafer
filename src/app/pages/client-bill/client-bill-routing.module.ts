import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientBillAllComponent } from './client-bill-all/client-bill-all.component';
import { CreateClientBillComponent } from './create-client-bill/create-client-bill.component';
import { DetailClientBillComponent } from './detail-client-bill/detail-client-bill.component';

const routes: Routes = [
  { path: 'all', component: ClientBillAllComponent },
  { path: 'create', component: CreateClientBillComponent },
  { path: 'detail', component: DetailClientBillComponent },
  { path: '', redirectTo: 'all', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientBillRoutingModule { }
