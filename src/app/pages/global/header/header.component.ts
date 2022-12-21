import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService } from './header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    public headerService: HeaderService,
    private router: Router) { }

  ngOnInit(): void {
  }

  goHome(){
    this.router.navigateByUrl("/home");
  }

  goSection(){
    this.router.navigateByUrl("/home/section");
  }

  goProduct(){
    this.router.navigateByUrl("/home/product");
  }

  goProvider(){
    this.router.navigateByUrl("/home/supplier");
  }

  goOrder(){
    this.router.navigateByUrl("/home/order");
  }

  goClient(){
    this.router.navigateByUrl("/home/client");
  }

  goClientBill(){
    this.router.navigateByUrl("/home/clientbill");
  }

  goPayment(){
    this.router.navigateByUrl("/home/payment");
  }

}
