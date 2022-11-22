import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Supplier } from 'src/app/models/supplier.model';
import { SupplierService } from 'src/app/services/supplier/supplier.service';

@Component({
  selector: 'app-create-supplier',
  templateUrl: './create-supplier.component.html',
  styleUrls: ['./create-supplier.component.css']
})
export class CreateSupplierComponent implements OnInit {

  idSupplier?: number;
  supplierName?: string;
  sellerName?: string;

  constructor(private supplierService: SupplierService, private router: Router) { }

  ngOnInit(): void {
  }

  createSupplier(){
    let supplier: Supplier = {
      idSupplier: this.idSupplier,
      supplierName: this.supplierName,
      sellerName: this.sellerName
    }
    this.supplierService.create(supplier).subscribe({
      next: (supplier) => {
        this.router.navigate(["/home/supplier/all"]);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

}
