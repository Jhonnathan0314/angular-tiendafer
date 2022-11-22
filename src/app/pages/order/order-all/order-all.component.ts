import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderBill } from 'src/app/models/order.model';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-order-all',
  templateUrl: './order-all.component.html',
  styleUrls: ['./order-all.component.css']
})
export class OrderAllComponent implements OnInit {

  orders?: OrderBill[];

  constructor(private orderService: OrderService, private router: Router) { }

  ngOnInit(): void {
    this.findOrders();
  }

  findOrders(){
    this.orderService.findAll().subscribe({
      next: (orders) => {
        this.orders = orders;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  viewDetail(idOrder: number){
    this.router.navigate(["/home/order/detail/" + idOrder]);
  }

  deleteOrder(idOrder: number){
    this.orderService.deleteById(idOrder).subscribe({
      next: (res) => {
        this.ngOnInit();
      },
      error: (err) => {
        this.ngOnInit();
      }
    })
  }
}
