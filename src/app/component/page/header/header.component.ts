import { Component, OnInit } from '@angular/core';
import {TokenService} from "../../../service/auth/token.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private token:TokenService,
              private router: Router) { }
  isLogin:boolean = false;
  ngOnInit(): void {
    if(this.token.getToken()) {
      this.isLogin = true;
      console.log(this.token.getToken());
    }
  }

  logout() {
    window.sessionStorage.clear();
    // this.router.navigate([''])
    window.location.reload();
    this.isLogin = true;
  }

}
