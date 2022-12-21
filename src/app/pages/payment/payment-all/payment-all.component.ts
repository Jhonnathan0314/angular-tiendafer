import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientBill } from 'src/app/models/client-bill.model';
import { Client } from 'src/app/models/client.model';
import { Payment } from 'src/app/models/payment.model';
import { ClientBillService } from 'src/app/services/client-bill/client-bill.service';
import { ClientService } from 'src/app/services/client/client.service';
import { PaymentService } from 'src/app/services/payment/payment.service';
import { HeaderService } from '../../global/header/header.service';

@Component({
  selector: 'app-payment-all',
  templateUrl: './payment-all.component.html',
  styleUrls: ['./payment-all.component.css']
})
export class PaymentAllComponent implements OnInit {

  idClient?: number = -1;

  allClients?: Client[];
  filterClients?: Client[];
  payments?: Payment[];
  pendingBills?: ClientBill[];

  constructor(
    private clientService: ClientService, 
    private paymentService: PaymentService, 
    private clientBill: ClientBillService,
    private headerService: HeaderService,
    private router: Router) { }

  ngOnInit(): void {
    this.findClients();
    // this.findBills();
    // this.findPayments();
  }

  findClients(){
    this.headerService.show();

    this.clientService.findAll().subscribe({
      next: (clients) => {
        this.allClients = clients;
        if(this.idClient! > 0){
          this.filterClients = clients.filter(client => client.idClient == this.idClient);
        }else{
          this.filterClients = clients;
        }
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  findBills(){
    this.clientBill.findAll().subscribe({
      next: (bills) => {
        bills.sort((a, b) => (a.client?.idClient! < b.client?.idClient! ? -1 : 1));
        bills = bills.filter(bill => bill.pendingValue! > 0);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  findPayments(){
    this.paymentService.findAll().subscribe({
      next: (payments) => {
        this.payments = payments;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  filterByClient(){
    this.ngOnInit();
  }

  viewBills(idClient: number){
    this.router.navigate(["/home/payment/client/all/" + idClient]);
  }

  goPayment(idClient: number){
    this.router.navigate(["/home/payment/create/" + idClient]);
  }

}
