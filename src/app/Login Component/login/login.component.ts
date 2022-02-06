import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,FormBuilder,Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {

  }

  LoginForm = new FormGroup({
    username: new FormControl(),
    password: new FormControl()
  });

  onSubmit(){
    //username and password check
  }

}
