import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/models/client.model';
import { Payment } from 'src/app/models/payment.model';
import { ClientService } from 'src/app/services/client/client.service';
import { PaymentService } from 'src/app/services/payment/payment.service';

@Component({
  selector: 'app-create-payment',
  templateUrl: './create-payment.component.html',
  styleUrls: ['./create-payment.component.css']
})
export class CreatePaymentComponent implements OnInit {

  idClient?: number;
  client?: Client;
  payment?: Payment;

  actualDate?: string;
  cash?: number;

  constructor(private clientService: ClientService, private paymentService: PaymentService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(idClient => {
      this.idClient = parseInt(idClient.get("_id")!);
      this.findClient()
    })
  }

  findClient(){
    this.clientService.findById(this.idClient!).subscribe({
      next: (client) => {
        this.client = client;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  generatePayment(){
    this.actualDate = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
    this.payment = {
      idPayment: 0,
      date: this.actualDate,
      cash: this.cash,
      changeMoney: 0
    }
    this.paymentService.create(this.payment, this.idClient!).subscribe({
      next: (payment) => {
        this.router.navigate(["/home/payment/all"]);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
