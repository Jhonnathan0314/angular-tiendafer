import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products?: Product[];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.findProducts();
  }

  findProducts(){
    this.productService.findAll().subscribe({
      next: (products) => {
        this.products = products.filter(product => product.quantityAvailable! <= 2);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
