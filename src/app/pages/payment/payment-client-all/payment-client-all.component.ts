import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientBill } from 'src/app/models/client-bill.model';
import { Client } from 'src/app/models/client.model';
import { ClientBillService } from 'src/app/services/client-bill/client-bill.service';
import { ClientService } from 'src/app/services/client/client.service';
import { HeaderService } from '../../global/header/header.service';

@Component({
  selector: 'app-payment-client-all',
  templateUrl: './payment-client-all.component.html',
  styleUrls: ['./payment-client-all.component.css']
})
export class PaymentClientAllComponent implements OnInit {

  idClient?: number;
  client?: Client;
  bills?: ClientBill[];

  constructor(
    private clientService: ClientService, 
    private clientBillService: ClientBillService,
    private headerService: HeaderService,
    private router: Router, 
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(idClient => {
      this.idClient = parseInt(idClient.get("_id")!);
      this.findClient();
      this.findBills()
    })
  }

  findClient(){
    this.headerService.show();

    this.clientService.findById(this.idClient!).subscribe({
      next: (client) => {
        this.client = client;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  findBills(){
    this.clientBillService.findAll().subscribe({
      next: (bills) => {
        this.bills = bills.filter(bill => bill.client?.idClient == this.idClient);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  viewDetail(idBill: number, idClient: number){
    this.router.navigate(["/home/payment/client/detail/" + idClient + "/" + idBill]);
  }
}
