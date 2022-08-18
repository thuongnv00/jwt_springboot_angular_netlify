import { Component, OnInit } from '@angular/core';
import {SignInForm} from "../../../model/SignInForm";
import {AuthService} from "../../../service/auth/auth.service";
import {TokenService} from "../../../service/auth/token.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  status = 'Please login your account';
  form:any ={};
  hide = true;
  signInForm: SignInForm;
  isLoggedIn = false;
  isLoginFailed = false;
  roles: string[] = [];
  name: string;
  constructor(private auth:AuthService,private token:TokenService) {}

  ngOnInit(): void {
    if(this.token.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.token.getRoles();
      this.name = this.token.getName();

    }
  }
  ngSubmit() {
    this.signInForm = new SignInForm(this.form.username,this.form.password);
    this.auth.signIn(this.signInForm).subscribe(data => {
      if(data.token != undefined) {
        this.token.setToken(data.token);
        this.token.setName(data.name);
        this.token.setRoles(data.roles);
        // this.isLoginFailed = true;
        this.status = 'login success';
        window.location.href = '';
      } else {
        this.status = 'Login Failed. Please try again';
      }
    })
  }




}
