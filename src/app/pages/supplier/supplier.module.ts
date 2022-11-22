import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupplierRoutingModule } from './supplier-routing.module';
import { SupplierAllComponent } from './supplier-all/supplier-all.component';
import { CreateSupplierComponent } from './create-supplier/create-supplier.component';
import { UpdateSupplierComponent } from './update-supplier/update-supplier.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SupplierAllComponent,
    CreateSupplierComponent,
    UpdateSupplierComponent
  ],
  imports: [
    CommonModule,
    SupplierRoutingModule,
    FormsModule
  ]
})
export class SupplierModule { }
