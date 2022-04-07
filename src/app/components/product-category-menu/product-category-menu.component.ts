import { Component, OnInit } from '@angular/core';
import {ProductCategory} from "../../common/product-category";
import {ProductService} from "../../services/product.service";
import {ActivatedRoute} from "@angular/router";
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-product-category-menu',
  templateUrl: './product-category-menu.component.html',
  styleUrls: ['./product-category-menu.component.css']
})
export class ProductCategoryMenuComponent implements OnInit {

  productCategories?: ProductCategory[];

  constructor(private productService: ProductService,
              private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.listProductCategories();
  }

  listProductCategories() {
    this.productService.getProductCategories()
      .subscribe(data=>{
        //console.log('Product categories' + JSON.stringify(data)) ;
        this.productCategories = data ;
        console.log('******************');
        console.log("Les categories : ");
        console.log(this.productCategories);
      });
  }

}
