import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Supplier } from 'src/app/models/supplier.model';
import { SupplierService } from 'src/app/services/supplier/supplier.service';
import { HeaderService } from '../../global/header/header.service';

@Component({
  selector: 'app-supplier-all',
  templateUrl: './supplier-all.component.html',
  styleUrls: ['./supplier-all.component.css']
})
export class SupplierAllComponent implements OnInit {

  suppliers?: Supplier[]
  searchName?: string;

  constructor(
    private supplierService: SupplierService,
    private headerService: HeaderService,
    private router: Router) { }

  ngOnInit(): void {
    this.findSuppliers();
  }

  findSuppliers(){
    this.headerService.show();

    this.supplierService.findAll().subscribe({
      next: (suppliers) => {
        if(this.searchName == undefined){
          this.suppliers = suppliers;
        }else{
          this.suppliers = suppliers.filter(supplier => supplier.supplierName?.toUpperCase().includes(this.searchName?.toUpperCase()!));
        }
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

  findByName(){
    this.ngOnInit()
  }
}
