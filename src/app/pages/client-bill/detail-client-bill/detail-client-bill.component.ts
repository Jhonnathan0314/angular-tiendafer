import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientBill } from 'src/app/models/client-bill.model';
import { DetailClientBill } from 'src/app/models/detail-client-bill.model';
import { ClientBillService } from 'src/app/services/client-bill/client-bill.service';
import { DetailClientBillService } from 'src/app/services/detail-client-bill/detail-client-bill.service';

@Component({
  selector: 'app-detail-client-bill',
  templateUrl: './detail-client-bill.component.html',
  styleUrls: ['./detail-client-bill.component.css']
})
export class DetailClientBillComponent implements OnInit {

  idBill?: number;
  detailBills?: DetailClientBill[];
  actualBill?: ClientBill;

  constructor(private clientBillService: ClientBillService, private detailClientBillService: DetailClientBillService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(idBill => {
      this.idBill = parseInt(idBill.get("_id")!);
    })
    this.findActualBill();
    setTimeout(() => {
      this.findDetailBills();
    }, 100);
  }

  findActualBill() {
    this.clientBillService.findById(this.idBill!).subscribe({
      next: (bill) => {
        this.actualBill = bill;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  findDetailBills() {
    this.detailClientBillService.findAll().subscribe({
      next: (detailBills) => {
        this.detailBills = detailBills.filter(detail => detail.clientBill?.idClientBill == this.idBill);
      }
    })
  }

}
