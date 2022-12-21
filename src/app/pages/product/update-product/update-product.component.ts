import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { Section } from 'src/app/models/section.model';
import { ProductService } from 'src/app/services/product/product.service';
import { SectionService } from 'src/app/services/section/section.service';
import { HeaderService } from '../../global/header/header.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css'],
  providers: [
    HeaderService
  ]
})
export class UpdateProductComponent implements OnInit {

  actualProduct?: Product;
  idProduct?: number;
  name?: string;
  quantityAvailable?: number;
  saleValue?: number;
  idSection: number = 0;
  sections?: Section[];

  constructor(
    private sectionService: SectionService, 
    private productService: ProductService,
    private headerService: HeaderService,
    private router: Router, 
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(idProduct => {
      this.idProduct = parseInt(idProduct.get("_id")!);
      this.getProduct()
    })
    this.findSections()
  }
  
  getProduct() {
    this.headerService.show()

    this.productService.findById(this.idProduct!).subscribe({
      next: (product) => {
        this.actualProduct = product;
        this.idProduct = product.idProduct;
        this.name = product.name;
        this.quantityAvailable = product.quantityAvailable;
        this.saleValue = product.saleValue;
        this.idSection = product.section?.idSection!;
      },
      error: (err) => {
        console.log(err);
      }
    })
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

  updateProduct(){
    this.actualProduct = {
      idProduct: this.idProduct,
      name: this.name,
      quantityAvailable: this.quantityAvailable,
      saleValue: this.saleValue
    }
    this.productService.update(this.actualProduct, this.idProduct!, this.idSection).subscribe({
      next: (product) => {
        this.router.navigate(["/home/product/all"]);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
