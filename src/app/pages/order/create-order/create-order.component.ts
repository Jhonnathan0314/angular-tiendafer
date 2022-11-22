import { formatDate } from '@angular/common';
import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OrderBill } from 'src/app/models/order.model';
import { Product } from 'src/app/models/product.model';
import { Supplier } from 'src/app/models/supplier.model';
import { OrderService } from 'src/app/services/order/order.service';
import { ProductService } from 'src/app/services/product/product.service';
import { SupplierService } from 'src/app/services/supplier/supplier.service';
import { DetailOrderBill } from 'src/app/models/detail-order-bill.model';
import { DetailOrderBillService } from 'src/app/services/detail-order-bill/detail-order-bill.service';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css']
})
export class CreateOrderComponent implements OnInit {

  actualOrder?: OrderBill;

  idSupplier: number = 0;

  actualDate?: string;

  idProduct?: number;
  productName?: string;
  orderedQuantityProduct: number = 0;
  receivedQuantityProduct: number = 0;
  unitValueProduct: number = 0;
  saleValue: number = 0;
  totalOrder?: number;
  
  findedProducts?: Product[];
  actualProduct?: Product;
  percentageProfit?: number;
  
  selectedProducts?: DetailOrderBill[];
  suppliers?: Supplier[];
  products?: Product[];

  constructor(private orderService: OrderService, private detailOrderService: DetailOrderBillService, 
    private supplierService: SupplierService, private productService: ProductService, 
    private router: Router, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.validateOrder();
    this.findSuppliers();
    this.findProducts();
    this.findSelectedProducts();
  }

  ngAfterViewChecked(): void {
    this.updateTotals();
  }

  validateOrder(){
    if(localStorage.getItem("actualOrder") == null){
      this.createOrder();
    }else{
      this.loadOrder();
    }
  }

  createOrder(){
    this.actualDate = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
    let order: OrderBill = {
      idOrderBill: 0,
      totalValue: 0,
      date: this.actualDate
    }
    this.orderService.create(order, this.idSupplier!).subscribe({
      next: (order) => {
        this.actualOrder = order;
        localStorage.setItem("actualOrder", order.idOrderBill+"");
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  loadOrder(){
    let idOrder = parseInt(localStorage.getItem("actualOrder")!);
    this.orderService.findById(idOrder).subscribe({
      next: (order) => {
        this.actualOrder = order;
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

  findProducts(){
    this.productService.findAll().subscribe({
      next: (products) => {
        this.products = products;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  findSelectedProducts(){
    this.detailOrderService.findAll().subscribe({
      next: (details) => {
        this.selectedProducts = details.filter(detail => detail.orderBill?.idOrderBill == this.actualOrder?.idOrderBill);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  showOptions(){
    if(this.productName != undefined){
      this.findedProducts = this.products?.filter(product => product.name!.toUpperCase().includes(this.productName!.toUpperCase()));
      const dialogRef = this.dialog.open(CreateOrderComponentDialog, {
        width: '600px',
        data: this.findedProducts
      });

      dialogRef.afterClosed().subscribe(result => {
        this.idProduct = result;
        if(this.idProduct != undefined) {
          this.actualProduct = this.findedProducts?.filter(product => product.idProduct == this.idProduct)[0];
        }
      });
    }
  }

  addProduct(){
    if(this.selectedProducts?.length! > 0){
      for(let detail of this.selectedProducts!){
        this.detailOrderService.update(detail, detail.idDetailOrderBill!, detail.product?.idProduct!, detail.orderBill?.idOrderBill!).subscribe({
          next: (res) => {
            console.log("Guarde");
          },
          error: (err) => {
            console.log(err);
          }
        })
      }
    }
    if(this.actualProduct != undefined){
      console.log("entre a addproduct if")
      let detail: DetailOrderBill = {
        idDetailOrderBill: 0,
        orderedQuantity: 0,
        receivedQuantity: 0,
        unitValue: 0,
        totalValue: 0
      }
      this.detailOrderService.create(detail, this.actualProduct?.idProduct!, this.actualOrder?.idOrderBill!).subscribe({
        next: (detail) => {
          this.selectedProducts?.push(detail);
        },
        error: (err) => {
          console.log(err);
        }
      })
      this.ngOnInit()
    }
  }

  removeProduct(idProduct: number){

  }

  updateTotal(idDetailOrderBill: number){
    for(let detail of this.selectedProducts!){
      if(detail.idDetailOrderBill == idDetailOrderBill){
        detail.totalValue = detail.receivedQuantity! * detail.unitValue!;
        detail.percentageProfit = Number((((detail.product!.saleValue! - detail.unitValue!) / detail.unitValue!)*100).toFixed(2));
      }
    }
  }

  updateTotals(){
    for(let detail of this.selectedProducts!){
      if(detail.idDetailOrderBill! == parseInt(localStorage.getItem("actualOrder")!)){
        console.log("entre a act porc")
        detail.totalValue = detail.receivedQuantity! * detail.unitValue!;
        detail.percentageProfit = Number((((detail.product!.saleValue! - detail.unitValue!) / detail.unitValue!)*100).toFixed(2));
      }
    }
  }

  deleteOrder(){
    localStorage.removeItem("actualOrder");
    this.orderService.deleteById(this.actualOrder?.idOrderBill!).subscribe({
      next: (res) => {
        this.router.navigate(["/home/order/all"]);
      },
      error: (err) => {
        this.router.navigate(["/home/order/all"]);
      }
    })
  }
}

@Component({
  selector: 'app-modal-product',
  templateUrl: './create-order-dialog.component.html',
  styleUrls: ['./create-order.component.css']
})
export class CreateOrderComponentDialog implements OnInit {

  idProduct: number = 0;

  constructor( public dialogRef: MatDialogRef<CreateOrderComponentDialog>, @Inject(MAT_DIALOG_DATA) public products: Product[]) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}