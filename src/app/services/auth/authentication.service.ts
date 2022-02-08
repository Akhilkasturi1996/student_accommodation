import { Injectable } from '@angular/core';
import {SignInData} from '../../Models/signInData';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private readonly mockUser = new SignInData('test@gmail.com', 'test');
  isAuthenticate = false;
  constructor(private router: Router) { }

  authentcate(signInData: SignInData): boolean{
    if (this.checkCredentials(signInData)){
      this.isAuthenticate = true;
      this.router.navigate(['dashboard']);
      return true;
    }
    else {
      this.isAuthenticate = false;
      return false;
    }
  }

  private checkCredentials(signInData: SignInData): boolean{
    return this.checkUsername(signInData.getUsername()) && this.checkPassword(signInData.getPassword());
  }

  private checkUsername(username: string): boolean{
    return username === this.mockUser.getUsername();

  }private checkPassword(password: string): boolean{
    return password === this.mockUser.getPassword();
  }
}
