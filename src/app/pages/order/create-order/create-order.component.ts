import { formatDate } from '@angular/common';
import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  /* Variable que guarda la factura actual */
  actualOrder?: OrderBill;

  /* Id del proveedor seleccionado */
  idSupplier: number = 0;

  /* Fecha actual */
  actualDate?: string;

  /* Id del producto seleccionado en el modal */
  idProduct?: number;
  /* Variable que guarda el nombre del/los productos a buscar */
  productName?: string;
  
  /* Guarda el producto seleccionado en el modal */
  actualProduct?: Product;
  /* Arreglo de productos que se visualizan en el modal */
  findedProducts?: Product[];
  /* Arreglo que tiene los productos añadidos a la factura */
  selectedProducts?: DetailOrderBill[];
  /* Arreglo que tiene todos los proveedores */
  suppliers?: Supplier[];
  /* Arreglo que tiene todos los productos */
  products?: Product[];

  constructor(private orderService: OrderService, private detailOrderService: DetailOrderBillService, 
    private supplierService: SupplierService, private productService: ProductService, 
    private router: Router, private activatedRoute: ActivatedRoute, private dialog: MatDialog) {
  }

  /* Antes de iniciar valida:
   * - Existencia de un pedido que no se finalizó
   * - Guarda todos los proveedores
   * - Guarda todos los productos
   * - Guarda los productos agregados al pedido en curso
  */
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(idSupplier => {
      this.idSupplier = parseInt(idSupplier.get("_id")!);
      this.validateOrder(parseInt(idSupplier.get("_id")!));
    })
  }

  /* Si no existe un pedido crea uno nuevo, de lo contrario va a loadOrder() */
  validateOrder(idSupplier: number){
    if(localStorage.getItem("actualOrder") == null){
      this.createOrder(idSupplier);
    }else{
      this.loadOrder();
    }
  }

  /* Crea un nuevo pedido con la fecha actual y el resto de atributos en 0 */
  createOrder(idSupplier: number){
    this.actualDate = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
    let order: OrderBill = {
      idOrderBill: 0,
      totalValue: 0,
      date: this.actualDate
    }
    this.orderService.create(order, idSupplier).subscribe({
      next: (order) => {
        this.actualOrder = order;
        localStorage.setItem("actualOrder", order.idOrderBill+"");
        this.findSuppliers();
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  /* Busca el pedido en curso por id */
  loadOrder(){
    let idOrder = parseInt(localStorage.getItem("actualOrder")!);
    this.orderService.findById(idOrder).subscribe({
      next: (order) => {
        this.actualOrder = order;
        this.findSuppliers();
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  /* Busca todos los proveedores */
  findSuppliers(){
    this.supplierService.findAll().subscribe({
      next: (suppliers) => {
        this.suppliers = suppliers;
        this.findProducts();
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  /* Busca todos los productos */
  findProducts(){
    this.productService.findAll().subscribe({
      next: (products) => {
        this.products = products;
        this.findSelectedProducts();
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  /* Busca los productos agregados al pedido en curso */
  findSelectedProducts(){
    this.detailOrderService.findAll().subscribe({
      next: (details) => {
        this.selectedProducts = details.filter(detail => detail.orderBill?.idOrderBill == this.actualOrder?.idOrderBill);
        this.updateTotals();
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  /* Guarda los productos que coincidan con la busqueda y los envia al modal, seguidamente abre el modal
   * Cuando finaliza, en caso de haber seleccionado un producto se guarda su id
  */
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

  /* Agrega un producto al pedido siguiendo los siguientes pasos:
   * - Valida si esta repetido o no
   * - Ejecuta el metodo saveData()
   * - Si hay un producto seleccionado y no esta repetido
   *    - Crea un nuevo detailOrder vacio, enviando su producto y pedido
   *    - En caso de ejecutarse de manera correcta lo guarda en el arrego selectedProducts
   *    - Si se encuentra el id del pedido en localStorage ejecuta ngOnInit() para actualizar la pantalla
  */
  addProduct(){
    let isRepeated = false;
    for(let detail of this.selectedProducts!){
      if(detail.product?.idProduct == this.actualProduct?.idProduct){
        isRepeated = true;
      }
    }
    this.saveData()
    if(this.actualProduct != undefined && !isRepeated){
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
      this.actualProduct = undefined;
      if(localStorage.getItem("actualOrder") != null){
        this.ngOnInit()
      }
    }
  }

  /* 
   * En caso de haber productos recorre el arreglo en el que se encuentra y:
   * - Actualiza detailOrder en la base de datos con el producto anterior
   * - Actualiza el nuevo precio del producto anterior
   * - Actualiza pantalla 
  */
  saveData(){
    if(this.selectedProducts?.length! > 0){
      for(let detail of this.selectedProducts!){
        this.detailOrderService.update(detail, detail.idDetailOrderBill!, detail.product?.idProduct!, detail.orderBill?.idOrderBill!).subscribe({
          next: (res) => {
            res.product!.saleValue = detail.product?.saleValue;
            this.productService.update(res.product!, res.product?.idProduct!, res.product?.section?.idSection!).subscribe({
              next: (product) => {
                detail.product = product;
                if(localStorage.getItem("actualOrder") != null){
                  this.ngOnInit()
                }
              },
              error: (err) =>{
                console.log(err);
              }
            })
          },
          error: (err) => {
            console.log(err);
          }
        })
      }
    }
  }

  /* Elimina el detalle con el producto seleccionado en pantalla y actualiza la pantalla */
  removeProduct(idProduct: number){
    let detailRemove: DetailOrderBill[] = this.selectedProducts?.filter(detail => detail.product?.idProduct! == idProduct)!;
    for(let detail of detailRemove){
      this.detailOrderService.deleteById(detail.idDetailOrderBill!).subscribe({
        next: (res) => {
          console.log(res);
          this.ngOnInit()
        },
        error: (err) => {
          console.log(err);
          this.ngOnInit()
        }
      })
    }
  }

  /* Metodo que actualiza valor total y porcentaje de ganancia en el arreglo de productos del pedido */
  updateTotals(){
    this.actualOrder!.totalValue! = 0;
    for(let detail of this.selectedProducts!){
      detail.totalValue = detail.receivedQuantity! * detail.unitValue!;
      detail.percentageProfit = Number((((detail.product!.saleValue! - detail.unitValue!) / detail.unitValue!)*100).toFixed(2));
      this.actualOrder!.totalValue! += detail.totalValue;
    }
  }

  /* Elimina del localStorage y de la base de datos el pedido actual */
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

  /* Elimina el pedido del localStorage y guarda los ultimos cambios, actualiza el proveedor del pedido y vuelve a la pagina pedidos  */
  updateSupplier(){
    localStorage.removeItem("actualOrder");
    this.orderService.addSupplier(this.actualOrder?.idOrderBill!, this.idSupplier).subscribe({
      next: (order) => {
        this.addProduct();
        setTimeout(() => {
          this.router.navigate(["/home/order/all"]);
        }, 2000);
      },
      error: (err) => {
        console.log(err);
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