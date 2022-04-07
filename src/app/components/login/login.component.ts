import {Component, Inject, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";
import {renewTokensWithRefresh} from "@okta/okta-auth-js";
import {ProductService} from "../../services/product.service";




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  mode: number = 0;
  storage: Storage = sessionStorage;

  private fullUser: any;

  constructor( private authService: AuthenticationService, private router: Router,
               private productService: ProductService) {
  }

  ngOnInit(): void {

  /*  this.authService.loadToken();
    if (this.authService.getToken() != null) {

    } */

     let token = this.authService.loadToken();
      if (token) {
        this.router.navigateByUrl('/products');
      }
  }




  onLogin(user: any) {
    console.log(user);
    this.authService.login(user)
      .subscribe((resp: any)=>{
          let  jwt = resp.headers.get('Authorization');
          //console.log(resp.headers.get('Authorization')) ;
        this.authService.saveToken(jwt);
        this.router.navigateByUrl('/products') ;
      },
        (err: any)=>{
          this.mode = 1 ;
        });
  }
}
