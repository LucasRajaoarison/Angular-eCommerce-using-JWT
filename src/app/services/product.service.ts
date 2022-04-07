import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

import {Product} from "../common/product";

import {map} from "rxjs/operators";
import {Observable} from "rxjs";
import {ProductCategory} from "../common/product-category";
import {JwtHelperService} from "@auth0/angular-jwt";
import {AuthenticationService} from "./authentication.service";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = environment.luv2shopApiUrl + "/products" ;
  private categoryUrl = environment.luv2shopApiUrl + "/product-category";
  private jwtToken:any = null;

  constructor(private httpClient: HttpClient,
              private jwtHelper: JwtHelperService,
              private authService: AuthenticationService) { }

  //pagination
  getProductListPaginate(thePage:number,
                         thePageSize:number,
                         theCategoryId: number): Observable<GetResponseProducts> {

    // need to build url based on category id, page and size
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`
                      + `&page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<GetResponseProducts>(searchUrl) ;
  }

  //pagination
  searchProductListPaginate(thePage:number,
                           thePageSize:number,
                           theKeyWord: string | null): Observable<GetResponseProducts> {


    // need to build url based on keyword id, page and size
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyWord}`
      + `&page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<GetResponseProducts>(searchUrl) ;
  }

  getProductList(theCategoryId: number): Observable<Product[]> {
    // need to build url based on category id
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}` ;

    return this.getProducts(searchUrl);
  }

  // @ts-ignore
  searchProduct(theKeyWord: string | null): Observable<Product[]>  {
    // need to build url based on the keyword
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyWord}` ;

    return this.getProducts(searchUrl);
  }

  private getProducts(searchUrl: string) {

    //spécifier le type d'objet de réponse avec get<GetResponse>
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products)
    )
  };

  getProductCategories(): Observable<ProductCategory[]> {

    return this.httpClient.get<GetResponseProductsCategory>(this.categoryUrl).pipe(
      map(response=>response._embedded.productCategory)
    );
  }

  getProduct(theProductId: number): Observable<Product> {

    const productUrl = `${this.baseUrl}/${theProductId}`;
    return this.httpClient.get<Product>(productUrl);
  }






}

//take that _embedded and then take those products inside of embedded and then map those into a given product
//ce code  prends le JSON Data, le decompose et ensuite le placer dans un tableau de produits (products[])
interface GetResponseProducts{
  _embedded: {
    products: Product[] ;
  },
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number
  }
}

interface GetResponseProductsCategory{
  _embedded: {
    productCategory: ProductCategory[] ;
  }
}
