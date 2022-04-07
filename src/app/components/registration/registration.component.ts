import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  private user: any;
  public mode?: number;
  private errorMessage?: string;

  constructor(private authService: AuthenticationService,
              private router: Router) { }

  ngOnInit(): void {
  }

  onRegister(user: any) {
    this.authService.register(user)
      .subscribe(data => {
        this.user = data;
        this.mode = 1;
        this.router.navigateByUrl('/success');
        console.log("++++++++++++++++++++++")
        console.log(user);
      }, err => {
        this.errorMessage = err.error.message;
        this.mode = 0;
      })
  }

}
