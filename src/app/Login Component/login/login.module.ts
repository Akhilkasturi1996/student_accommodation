import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule,ReactiveFormsModule} from '@angular/forms'
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './login.component';
import { HttpClientModule } from '@angular/common/http';

const routes : Routes = [
  {path:"",component:LoginComponent}
]

@NgModule({
  declarations: [],
  imports: [
    LoginComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
  exports:[RouterModule],
  providers:[
    HttpClientModule,
  ]
})

export class LoginModule { }
