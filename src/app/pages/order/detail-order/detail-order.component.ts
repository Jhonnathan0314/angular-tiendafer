import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DetailOrderBill } from 'src/app/models/detail-order-bill.model';
import { OrderBill } from 'src/app/models/order.model';
import { DetailOrderBillService } from 'src/app/services/detail-order-bill/detail-order-bill.service';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-detail-order',
  templateUrl: './detail-order.component.html',
  styleUrls: ['./detail-order.component.css']
})
export class DetailOrderComponent implements OnInit {

  idOrder?: number;
  detailOrders?: DetailOrderBill[];
  actualOrder?: OrderBill;

  constructor(private orderService: OrderService, private detailOrderService: DetailOrderBillService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(idOrder => {
      this.idOrder = parseInt(idOrder.get("_id")!);
    })
    this.findActualOrder();
    this.findDetailOrders();
  }

  findActualOrder() {
    this.orderService.findById(this.idOrder!).subscribe({
      next: (order) => {
        this.actualOrder = order;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  findDetailOrders() {
    this.detailOrderService.findAll().subscribe({
      next: (detailOrders) => {
        this.detailOrders = detailOrders.filter(detail => detail.orderBill?.idOrderBill == this.idOrder);
      }
    })
  }
}
