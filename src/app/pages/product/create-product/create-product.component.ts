import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { Section } from 'src/app/models/section.model';
import { ProductService } from 'src/app/services/product/product.service';
import { SectionService } from 'src/app/services/section/section.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

  idProduct?: number;
  name?: string;
  quantityAvailable?: number;
  saleValue?: number;
  idSection: number = 0;
  sections?: Section[];

  constructor(private productService: ProductService, private sectionService: SectionService, private router: Router) { }

  ngOnInit(): void {
    this.findSections()
  }

  findSections(){
    this.sectionService.findAll().subscribe({
      next: (sections) => {
        this.sections = sections;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  createProduct(){
    let product: Product = {
      idProduct: 0,
      name: this.name,
      quantityAvailable: this.quantityAvailable,
      saleValue: this.saleValue
    }
    this.productService.create(product, this.idSection!).subscribe({
      next: (product) => {
        this.router.navigate(["/home/product/all"]);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
