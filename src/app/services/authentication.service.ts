import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {JwtHelperService} from "@auth0/angular-jwt";
import {Product} from "../common/product";
import {Observable} from "rxjs";
import {User} from "../common/user";
import {environment} from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private host: string = environment.luv2shopApiUrl ;
  private hostLog: string = environment.hostLogin;
  private roles: Array<any> = [] ;
  private jwtToken:any = null;
  public isLoggedIn: boolean = false;
  public loggedUser?: string;

  storage: Storage = sessionStorage;

  constructor(private httpClient: HttpClient,
              private jwtHelper: JwtHelperService) { }

  login(user: any) {
      return this.httpClient.post(this.hostLog + "/login", user, {observe: 'response'}) ;
  }

  register(user: any) {
    return this.httpClient.post(this.host + "/register", user);
  }

  saveToken(jwt: any) {

    localStorage.setItem('token', jwt) ;
    this.jwtToken = jwt;
    this.decodeJWT();
  }

  decodeJWT() {
    if (this.jwtToken == undefined) {
      return
    }
    const decodedToken = this.jwtHelper.decodeToken(this.jwtToken);
    this.roles = decodedToken.roles;
    //sub = le nom de l'utilistaeur connectés
    this.loggedUser = decodedToken.sub;
    console.log("Le nom du user est " + this.loggedUser);
  }

  loadToken() {
    this.jwtToken=localStorage.getItem('token');
    this.decodeJWT();
    return this.jwtToken;

  }

  logout() {
    this.loggedUser = undefined;
    this.roles = [null];
    this.jwtToken=null;
    this.isLoggedIn = false;
    this.storage.removeItem('userEmail');
    this.storage.removeItem('cartItems');
    localStorage.removeItem('token');
  }

  getToken() {
    return this.jwtToken;
  }

  isTokenExpired(): boolean {
      return this.jwtHelper.isTokenExpired(this.jwtToken) ;
  }

  isAdmin() {
        for(let r of this.roles) {
            if (r.authority == 'ADMIN') {
              return true;
            }
        }
      return false;
  }


  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    if (token) {

          this.isLoggedIn = true;
         // Check if the token is expired and return true or false
          return !this.jwtHelper.isTokenExpired(token!);

    }
    return false;
  }

  getUserDetails(name: string): Observable<User> {
    const findUrl = `${this.host}/test/findUser?username=${name}`;
    return this.httpClient.get<User>(findUrl);
  }




}
