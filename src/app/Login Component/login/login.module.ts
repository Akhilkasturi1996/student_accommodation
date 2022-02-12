import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './login.component';
import {HttpClientModule} from '@angular/common/http';
import {MatFormFieldModule} from '@angular/material/form-field';
import {authInterceptorProviders} from '../../services/AuthInterceptor/AuthIntercepter';

const routes: Routes = [
  {path: '', component: LoginComponent}
];

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    MatFormFieldModule,
    HttpClientModule
  ],
  exports: [RouterModule],
  providers: [
    HttpClientModule,
    authInterceptorProviders,

  ]
})

export class LoginModule { }
