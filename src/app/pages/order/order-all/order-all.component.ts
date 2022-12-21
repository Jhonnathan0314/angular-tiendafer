import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OrderBill } from 'src/app/models/order.model';
import { Supplier } from 'src/app/models/supplier.model';
import { OrderService } from 'src/app/services/order/order.service';
import { SupplierService } from 'src/app/services/supplier/supplier.service';
import { HeaderService } from '../../global/header/header.service';

@Component({
  selector: 'app-order-all',
  templateUrl: './order-all.component.html',
  styleUrls: ['./order-all.component.css'],
  providers: [
    HeaderService
  ]
})
export class OrderAllComponent implements OnInit {

  orders?: OrderBill[];
  suppliers?: Supplier[];

  constructor(
    private orderService: OrderService, 
    private supplierService: SupplierService,
    private headerService: HeaderService,
    private router: Router, 
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.findOrders();
    this.findSuppliers();
  }

  findOrders(){
    this.headerService.show();

    this.orderService.findAll().subscribe({
      next: (orders) => {
        this.orders = orders;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  findSuppliers(){
    this.supplierService.findAll().subscribe({
      next: (suppliers) => {
        this.suppliers = suppliers;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  viewDetail(idOrder: number){
    this.router.navigate(["/home/order/detail/" + idOrder]);
  }

  deleteOrder(idOrder: number){
    this.orderService.deleteById(idOrder).subscribe({
      next: (res) => {
        this.ngOnInit();
      },
      error: (err) => {
        this.ngOnInit();
      }
    })
  }

  askSupplier(){
    const dialogRef = this.dialog.open(OrderAllSelectComponentDialog, {
      width: '600px',
      data: this.suppliers
    });

    dialogRef.afterClosed().subscribe(idSupplier => {
      if(idSupplier != undefined){
        this.goCreate(idSupplier);
      }
    });
  }

  goCreate(idSupplier: number){
    this.router.navigate(["/home/order/create/" + idSupplier])
  }
}

@Component({
  selector: 'app-modal-product',
  templateUrl: './order-all-select-dialog.component.html',
  styleUrls: ['./order-all.component.css']
})
export class OrderAllSelectComponentDialog implements OnInit {

  idSupplier: number = 0;

  constructor( public dialogRef: MatDialogRef<OrderAllSelectComponentDialog>, @Inject(MAT_DIALOG_DATA) public suppliers: Supplier[]) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
