import { Component, OnInit } from '@angular/core';
import {SignUpForm} from "../../../model/SignUpForm";
import {FormControl, Validators} from "@angular/forms";
import {AuthService} from "../../../service/auth/auth.service";
import {SignInForm} from "../../../model/SignInForm";
import {TokenService} from "../../../service/auth/token.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  status = 'Please fill the form';
  form:any ={};
  signUpForm: SignUpForm;
  hide = true;
  emailFormControl =  new FormControl('',[
    Validators.required,
    Validators.email
  ])
  error1: any = {
    message: "nouser"
  }
  error2: any = {
    message: "noemail"
  }
  success: any = {
    message: "yes"
  }

  constructor(private authService: AuthService,
              private router: Router) {
  }
  ngSubmit() {
    this.signUpForm = new SignUpForm(
      this.form.name,
      this.form.username,
      this.form.email,
      this.form.password)
    this.authService.signUp(this.signUpForm).subscribe(data=> {
      if(JSON.stringify(data)== JSON.stringify(this.error1)) {
        this.status = 'Username already exists. Please try again !'
      }

      if(JSON.stringify(data)== JSON.stringify(this.error2)) {
        this.status = 'Email already exists. Please try again !';
      }
      if(JSON.stringify(data)== JSON.stringify(this.success)) {
        this.status = 'Create user success. Please login !';
        // window.location.href = '/login';
        this.router.navigate(['/login'])
      }
    }
    )
  }
  onChangedAvatar($event) {
    console.log('avatar ==>',$event)
  }
  onChangedFile($event) {
    console.log('file ==>',$event)

  }



  ngOnInit(): void {

    }


}
