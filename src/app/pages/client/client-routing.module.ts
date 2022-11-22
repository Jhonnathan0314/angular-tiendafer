import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientAllComponent } from './client-all/client-all.component';
import { CreateClientComponent } from './create-client/create-client.component';
import { UpdateClientComponent } from './update-client/update-client.component';

const routes: Routes = [
  { path: 'all', component: ClientAllComponent },
  { path: 'create', component: CreateClientComponent },
  { path: 'update/:_id', component: UpdateClientComponent },
  { path: '', redirectTo: 'all', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
