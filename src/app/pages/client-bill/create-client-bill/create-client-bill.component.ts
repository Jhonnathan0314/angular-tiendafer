import { formatDate } from '@angular/common';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientBill } from 'src/app/models/client-bill.model';
import { Client } from 'src/app/models/client.model';
import { DetailClientBill } from 'src/app/models/detail-client-bill.model';
import { Product } from 'src/app/models/product.model';
import { ClientBillService } from 'src/app/services/client-bill/client-bill.service';
import { ClientService } from 'src/app/services/client/client.service';
import { DetailClientBillService } from 'src/app/services/detail-client-bill/detail-client-bill.service';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-create-client-bill',
  templateUrl: './create-client-bill.component.html',
  styleUrls: ['./create-client-bill.component.css']
})
export class CreateClientBillComponent implements OnInit {

  /* Variable que guarda la factura actual */
  actualBill?: ClientBill;

  /* Id del proveedor seleccionado */
  idClient?: number;

  /* Fecha actual */
  actualDate?: string;

  /* Id del producto seleccionado en el modal */
  idProduct?: number;
  /* Variable que guarda el nombre del/los productos a buscar */
  productName?: string;
  /*  */
  actualQuantity?: number;
  
  /* Guarda el producto seleccionado en el modal */
  actualProduct?: Product;
  /* Arreglo de productos que se visualizan en el modal */
  findedProducts?: Product[];
  /* Arreglo que tiene los productos añadidos a la factura */
  selectedProducts?: DetailClientBill[];
  /* Arreglo que tiene todos los proveedores */
  clients?: Client[];
  /* Arreglo que tiene todos los productos */
  products?: Product[];

  constructor(private clientBillService: ClientBillService, private detailClientBillService: DetailClientBillService, 
    private clientService: ClientService, private productService: ProductService, 
    private router: Router, private dialog: MatDialog, private activatedRoute: ActivatedRoute) { }

  /* Antes de iniciar valida:
   * - Existencia de un pedido que no se finalizó
   * - Guarda todos los proveedores
   * - Guarda todos los productos
   * - Guarda los productos agregados al pedido en curso
  */
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(res => {
      this.idClient = parseInt(res.get("_idClient")!);
      this.validateBill(res.get("_isPending")!, parseInt(res.get("_idClient")!));
    })
  }

  /* Si no existe un pedido crea uno nuevo, de lo contrario va a loadOrder() */
  validateBill(isPending: string, idClient: number){
    if(localStorage.getItem("actualBill") == null){
      this.createBill(isPending, idClient);
    }else{
      this.loadBill();
    }
  }

  /* Crea un nuevo pedido con la fecha actual y el resto de atributos en 0 */
  createBill(_isPending: string, idClient: number){
    this.actualDate = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
    let bill: ClientBill = {
      idClientBill: 0,
      totalValue: 0,
      date: this.actualDate,
      pending: _isPending
    }
    this.clientBillService.create(bill, idClient).subscribe({
      next: (bill) => {
        this.actualBill = bill;
        localStorage.setItem("actualBill", bill.idClientBill+"");
        console.log(bill);
        this.findClients();
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  /* Busca el pedido en curso por id */
  loadBill(){
    let idBill = parseInt(localStorage.getItem("actualBill")!);
    this.clientBillService.findById(idBill).subscribe({
      next: (bill) => {
        this.actualBill = bill;
        this.idClient = bill.client?.idClient;
        this.findClients();
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  /* Busca todos los proveedores */
  findClients(){
    this.clientService.findAll().subscribe({
      next: (clients) => {
        this.clients = clients;
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
    this.detailClientBillService.findAll().subscribe({
      next: (details) => {
        this.selectedProducts = details.filter(detail => detail.clientBill?.idClientBill == this.actualBill?.idClientBill);
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
      const dialogRef = this.dialog.open(CreateClientBillComponentDialog, {
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
      let detail: DetailClientBill = {
        idDetailClientBill: 0,
        quantity: this.actualQuantity,
        unitValue: 0,
        totalValue: 0
      }
      this.detailClientBillService.create(detail, this.actualProduct?.idProduct!, this.actualBill?.idClientBill!).subscribe({
        next: (detail) => {
          this.selectedProducts?.push(detail);
        },
        error: (err) => {
          console.log(err);
        }
      })
      this.actualProduct = undefined;
      if(localStorage.getItem("actualBill") != null){
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
        this.detailClientBillService.update(detail, detail.idDetailClientBill!, detail.product?.idProduct!, detail.clientBill?.idClientBill!).subscribe({
          next: (res) => {
            if(localStorage.getItem("actualBill") != null){
              this.ngOnInit()
            }
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
    let detailRemove: DetailClientBill[] = this.selectedProducts?.filter(detail => detail.product?.idProduct! == idProduct)!;
    for(let detail of detailRemove){
      this.detailClientBillService.deleteById(detail.idDetailClientBill!).subscribe({
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
    this.actualBill!.totalValue! = 0;
    for(let detail of this.selectedProducts!){
      detail.totalValue = detail.quantity! * detail.unitValue!;
      this.actualBill!.totalValue! += detail.totalValue;
    }
  }

  /* Elimina del localStorage y de la base de datos el pedido actual */
  deleteBill(){
    localStorage.removeItem("actualBill");
    this.clientBillService.deleteById(this.actualBill?.idClientBill!).subscribe({
      next: (res) => {
        this.router.navigate(["/home/clientbill/all"]);
      },
      error: (err) => {
        this.router.navigate(["/home/clientbill/all"]);
      }
    })
  }

  /* Elimina el pedido del localStorage y guarda los ultimos cambios, actualiza el proveedor del pedido y vuelve a la pagina pedidos  */
  finishCreation(){
    localStorage.removeItem("actualBill");
    this.addProduct();
    setTimeout(() => {
      this.router.navigate(["/home/clientbill/all"]);
    }, 1000);
  }
}


@Component({
  selector: 'app-modal-product',
  templateUrl: './create-client-bill-dialog.component.html',
  styleUrls: ['./create-client-bill.component.css']
})
export class CreateClientBillComponentDialog implements OnInit {

  idProduct: number = 0;

  constructor( public dialogRef: MatDialogRef<CreateClientBillComponentDialog>, @Inject(MAT_DIALOG_DATA) public products: Product[]) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}