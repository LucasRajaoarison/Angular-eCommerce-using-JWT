import {Injector, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {ProductService} from "./services/product.service";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {Router, RouterModule, Routes} from "@angular/router";
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { SearchComponent } from './components/search/search.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { LoginComponent } from './components/login/login.component';
import { LoginStatusComponent } from './components/login-status/login-status.component';

import {OKTA_CONFIG, OktaAuthGuard, OktaAuthModule, OktaCallbackComponent} from "@okta/okta-angular";
import { OktaAuth } from '@okta/okta-auth-js';

import { MembersPageComponent } from './components/members-page/members-page.component';
import { RegistrationComponent } from './components/registration/registration.component' ;
import {JWT_OPTIONS, JwtHelperService, JwtModule, JwtModuleOptions} from "@auth0/angular-jwt";
import { SuccessLoggedComponent } from './Handler/success-logged/success-logged.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import {AuthInterceptorService} from "./services/auth-interceptor.service";





const routes: Routes = [
  {
    path: 'order-history',
    component: OrderHistoryComponent,
  },
  {
    path: 'success',
    component: SuccessLoggedComponent,
  },
  {
    path: 'inscrire',
    component: RegistrationComponent,
  },
  {
    path: 'members',
    component: MembersPageComponent,
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: "checkout",
    component: CheckoutComponent
  },
  {
    path: "cart-details",
    component: CartDetailsComponent
  },
  {
    path: "products/:id",
    component: ProductDetailsComponent
  },
  {
    path: "search/:keyword",
    component: ProductListComponent
  },
  {
    path: "category/:id",
    component: ProductListComponent
  },
  {
    path: "category",
    component: ProductListComponent
  },
  {
    path: "products",
    component: ProductListComponent
  },
  {
    path: "",
    redirectTo: "products",
    pathMatch: "full"
  },
  {
    path: "**",
    redirectTo: "products",
    pathMatch: "full"
  },
] ;


@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCategoryMenuComponent,
    SearchComponent,
    ProductDetailsComponent,
    CartStatusComponent,
    CartDetailsComponent,
    CheckoutComponent,
    LoginComponent,
    LoginStatusComponent,
    MembersPageComponent,
    RegistrationComponent,
    SuccessLoggedComponent,
    OrderHistoryComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [ProductService, { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService, {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
