import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientBill } from 'src/app/models/client-bill.model';
import { Client } from 'src/app/models/client.model';
import { DetailClientBill } from 'src/app/models/detail-client-bill.model';
import { ClientBillService } from 'src/app/services/client-bill/client-bill.service';
import { ClientService } from 'src/app/services/client/client.service';
import { DetailClientBillService } from 'src/app/services/detail-client-bill/detail-client-bill.service';
import { HeaderService } from '../../global/header/header.service';

@Component({
  selector: 'app-payment-client-detail',
  templateUrl: './payment-client-detail.component.html',
  styleUrls: ['./payment-client-detail.component.css']
})
export class PaymentClientDetailComponent implements OnInit {

  idClient?: number;
  idBill?: number;
  client?: Client;
  bill?: ClientBill;
  detailsBill?: DetailClientBill[];

  constructor(
    private clientService: ClientService, 
    private clientBillService: ClientBillService, 
    private detailBillService: DetailClientBillService, 
    private headerService: HeaderService,
    private router: Router, 
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(res => {
      this.idBill = parseInt(res.get("_idBill")!);
      this.idClient = parseInt(res.get("_idClient")!);
      this.findClient();
      this.findBill();
      this.findDetails();
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

  findBill(){
    this.clientBillService.findById(this.idBill!).subscribe({
      next: (bill) => {
        this.bill = bill;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  findDetails(){
    this.detailBillService.findAll().subscribe({
      next: (details) => {
        this.detailsBill = details.filter(detail => detail.clientBill?.idClientBill == this.idBill);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  goBills(){
    this.router.navigate(["/home/payment/client/all/" + this.idClient]);
  }
}
