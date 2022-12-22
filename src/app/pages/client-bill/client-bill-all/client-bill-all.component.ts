import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ClientBill } from 'src/app/models/client-bill.model';
import { Client } from 'src/app/models/client.model';
import { Product } from 'src/app/models/product.model';
import { ClientBillService } from 'src/app/services/client-bill/client-bill.service';
import { ClientService } from 'src/app/services/client/client.service';
import { HeaderService } from '../../global/header/header.service';

@Component({
  selector: 'app-client-bill-all',
  templateUrl: './client-bill-all.component.html',
  styleUrls: ['./client-bill-all.component.css']
})
export class ClientBillAllComponent implements OnInit {

  bills?: ClientBill[];
  clients?: Client[];

  constructor(
    private clientBillService: ClientBillService, 
    private clientService: ClientService,
    private headerService: HeaderService,
    private router: Router, 
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.findBills();
    this.findClients();
  }

  findBills(){
    this.headerService.show();

    this.clientBillService.findAll().subscribe({
      next: (bills) => {
        this.bills = bills;
      },
      error: (err) => {
        console.log(err);
      },
    })
  }

  findClients(){
    this.clientService.findAll().subscribe({
      next: (clients) => {
        this.clients = clients;
      },
      error: (err) => {
        console.log(err);
      },
    })
  }

  viewDetail(idOrder: number){
    this.router.navigate(["/home/clientbill/detail/" + idOrder]);
  }

  deleteBill(idBill: number){
    this.clientBillService.deleteById(idBill).subscribe({
      next: (res) => {
        this.ngOnInit();
      },
      error: (err) => {
        this.ngOnInit();
      }
    })
  }

  showOptions(){
    const dialogRef = this.dialog.open(ClientBillAllComponentDialog, {
      width: '600px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result != undefined){
        this.askClient(result);
      }
    });
  }

  askClient(isPending: boolean){
    const dialogRef = this.dialog.open(ClientBillAllSelectComponentDialog, {
      width: '600px',
      data: this.clients
    });

    dialogRef.afterClosed().subscribe(idClient => {
      if(idClient != undefined){
        this.goCreate(isPending, idClient);
      }
    });
  }

  goCreate(isPending: boolean, idClient: number){
    this.router.navigate(["/home/clientbill/create/" + isPending + "/" + idClient])
  }
}


@Component({
  selector: 'app-modal-product',
  templateUrl: './client-bill-all-dialog.component.html',
  styleUrls: ['./client-bill-all.component.css']
})
export class ClientBillAllComponentDialog implements OnInit {

  isPendingBill: boolean = false;

  constructor( public dialogRef: MatDialogRef<ClientBillAllComponentDialog>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  setTrue(){
    this.dialogRef.close(true);
  }

  setFalse(){
    this.dialogRef.close(false);
  }
}

@Component({
  selector: 'app-modal-product',
  templateUrl: './client-bill-all-select-dialog.component.html',
  styleUrls: ['./client-bill-all.component.css']
})
export class ClientBillAllSelectComponentDialog implements OnInit {

  idClient: number = 0;

  constructor( public dialogRef: MatDialogRef<ClientBillAllSelectComponentDialog>, @Inject(MAT_DIALOG_DATA) public clients: Client[]) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}