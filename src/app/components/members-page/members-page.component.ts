import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-members-page',
  templateUrl: './members-page.component.html',
  styleUrls: ['./members-page.component.css']
})
export class MembersPageComponent implements OnInit {

  storage: Storage = sessionStorage;

  private fullUser: any;


  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {

    let userJwt = this.authService.loggedUser;
    console.log("Le user est :" + userJwt);
    this.getUserDetails(userJwt);

  }

   getUserDetails(user: any) {

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
