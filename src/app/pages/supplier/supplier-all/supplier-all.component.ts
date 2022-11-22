import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Supplier } from 'src/app/models/supplier.model';
import { SupplierService } from 'src/app/services/supplier/supplier.service';

@Component({
  selector: 'app-supplier-all',
  templateUrl: './supplier-all.component.html',
  styleUrls: ['./supplier-all.component.css']
})
export class SupplierAllComponent implements OnInit {

  suppliers?: Supplier[]

  constructor(private supplierService: SupplierService, private router: Router) { }

  ngOnInit(): void {
    this.findSuppliers();
  }

  findSuppliers(){
    this.supplierService.findAll().subscribe({
      next: (suppliers) => {
        this.suppliers = suppliers;
      },
      error: (err) =>{
        console.log(err);
      }
    })
  }

  updateSupplier(idSupplier: number){
    this.router.navigate(["/home/supplier/update/" + idSupplier])
  }

  deleteSupplier(idSupplier: number){
    this.supplierService.deleteById(idSupplier).subscribe({
      next: (res) => {
        this.ngOnInit();
      },
      error: (err) => {
        this.ngOnInit();
      }
    })
  }

}
