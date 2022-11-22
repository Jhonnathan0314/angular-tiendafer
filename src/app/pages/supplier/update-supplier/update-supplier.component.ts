import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Supplier } from 'src/app/models/supplier.model';
import { SupplierService } from 'src/app/services/supplier/supplier.service';

@Component({
  selector: 'app-update-supplier',
  templateUrl: './update-supplier.component.html',
  styleUrls: ['./update-supplier.component.css']
})
export class UpdateSupplierComponent implements OnInit {

  idSupplier?: number;
  supplierName?: string;
  sellerName?: string;
  actualSupplier?: Supplier;

  constructor(private supplierService: SupplierService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(idSupplier => {
      this.idSupplier = parseInt(idSupplier.get('_id')!); 
      this.getSupplier()
    });
  }

  getSupplier() {
    this.supplierService.findById(this.idSupplier!).subscribe({
      next: (supplier) => {
        this.actualSupplier = supplier;
        this.idSupplier = supplier.idSupplier;
        this.supplierName = supplier.supplierName;
        this.sellerName = supplier.sellerName;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  updateSupplier(){
    this.actualSupplier = {
      idSupplier: this.idSupplier,
      supplierName: this.supplierName,
      sellerName: this.sellerName
    }
    this.supplierService.update(this.actualSupplier, this.idSupplier!).subscribe({
      next: (supplier) => {
        this.router.navigate(["/home/supplier/all"])
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

}
