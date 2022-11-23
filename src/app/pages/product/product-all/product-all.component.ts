import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { Section } from 'src/app/models/section.model';
import { ProductService } from 'src/app/services/product/product.service';
import { SectionService } from 'src/app/services/section/section.service';

@Component({
  selector: 'app-product-all',
  templateUrl: './product-all.component.html',
  styleUrls: ['./product-all.component.css']
})
export class ProductAllComponent implements OnInit {

  products?: Product[];
  searchName?: string;

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.findProducts();
  }

  findProducts(){
    this.productService.findAll().subscribe({
      next: (products) => {
        if(this.searchName == undefined){
          this.products = products;
        }else{
          this.products = products.filter(product => product.name?.toUpperCase().includes(this.searchName?.toUpperCase()!));
        }
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  updateProduct(idProduct: number) {
    this.router.navigate(["/home/product/update/" + idProduct]);
  }

  deleteProduct(idProduct: number) {
    this.productService.deleteById(idProduct).subscribe({
      next: (res) => {
        this.ngOnInit()
      },
      error: (err) => {
        this.ngOnInit()
      }
    })
  }

  findByName(){
    this.ngOnInit()
  }
}
