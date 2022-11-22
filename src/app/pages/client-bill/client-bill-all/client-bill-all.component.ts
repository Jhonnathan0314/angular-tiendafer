import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ClientBill } from 'src/app/models/client-bill.model';
import { Product } from 'src/app/models/product.model';
import { ClientBillService } from 'src/app/services/client-bill/client-bill.service';

@Component({
  selector: 'app-client-bill-all',
  templateUrl: './client-bill-all.component.html',
  styleUrls: ['./client-bill-all.component.css']
})
export class ClientBillAllComponent implements OnInit {

  bills?: ClientBill[];

  constructor(private clientBillService: ClientBillService, private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.findBills();
  }

  findBills(){
    this.clientBillService.findAll().subscribe({
      next: (bills) => {
        this.bills = bills;
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

  showModal(isPending: boolean){
    this.router.navigate(["/home/clientbill/create/" + isPending])
  }

  showOptions(){
    const dialogRef = this.dialog.open(ClientBillAllComponentDialog, {
      width: '600px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result != undefined){
        this.showModal(result);
      }
    });
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