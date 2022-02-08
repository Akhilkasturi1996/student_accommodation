import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {AuthenticationService} from '../../services/auth/authentication.service';
import {SignInData} from '../../Models/signInData';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authenticationservice: AuthenticationService) {
  }

  get loginControl(){
    return this.LoginForm.controls;
  }

  LoginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  ngOnInit(): void {

  }

  // tslint:disable-next-line:typedef
  onSubmit(){
    // username and password check
    console.log(this.LoginForm.value.username);
    if (this.LoginForm.invalid){
      return;
    }

    const signInData = new SignInData(this.LoginForm.value.username, this.LoginForm.value.password);
    this.authenticationservice.authentcate(signInData);
  }

}
