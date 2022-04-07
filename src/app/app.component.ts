import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "./services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'angular-ecommerce';

  storage: Storage = sessionStorage;

  private fullUser: any;

  constructor(private authService: AuthenticationService,
              private router: Router) {
  }

  ngOnInit(): void {

    this.authService.loadToken();
    let userJwt = this.authService.loggedUser;
    console.log("Le user est :" + userJwt);
    this.getUserDetails(userJwt);
    if (this.authService.getToken() == null) {
      this.router.navigate(['/products']);
    }

  }

  public getUserDetails(user: any) {

    if (this.authService.isAuthenticated()) {

      this.authService.getUserDetails(user)
        .subscribe(data => {
          this.fullUser = data;
          const theEmail = this.fullUser.email;
          console.log(this.fullUser.email);
          this.storage.setItem('userEmail', JSON.stringify(theEmail));
        });

    }
  }

}
