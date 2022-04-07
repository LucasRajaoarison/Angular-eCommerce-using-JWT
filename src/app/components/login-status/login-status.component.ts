import {Component, Inject, OnInit} from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";
import {ProductService} from "../../services/product.service";
import {JwtHelperService} from "@auth0/angular-jwt";

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.css']
})
export class LoginStatusComponent implements OnInit {

  private token:any = null;



  constructor(private productService: ProductService,
              private router: Router,
              public authService: AuthenticationService,
              ) { }

  ngOnInit(): void {

  }



  onLogout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

}
