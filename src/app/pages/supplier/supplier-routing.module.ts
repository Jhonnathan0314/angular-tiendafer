import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateSupplierComponent } from './create-supplier/create-supplier.component';
import { SupplierAllComponent } from './supplier-all/supplier-all.component';
import { UpdateSupplierComponent } from './update-supplier/update-supplier.component';

const routes: Routes = [
  { path: 'all', component: SupplierAllComponent },
  { path: 'create', component: CreateSupplierComponent },
  { path: 'update/:_id', component: UpdateSupplierComponent },
  { path: '', redirectTo: 'all', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupplierRoutingModule { }
