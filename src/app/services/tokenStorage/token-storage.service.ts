import {Injectable} from '@angular/core';
import {RegistrationService} from '../Registration/registration.service';

const TOKEN_KEY = 'token';
const USER_ROLE = 'role';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor(private registrationService: RegistrationService) {
  }

  signOut() {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.clear();

    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.clear();
  }

  saveToken(token: string) {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, 'Bearer ' + token);
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, localStorage.getItem(TOKEN_KEY));
  }

  saveUser(user) {
    window.sessionStorage.removeItem(USER_ROLE);
    window.sessionStorage.setItem(USER_ROLE, user);
    window.localStorage.removeItem(USER_ROLE);
    window.localStorage.setItem(USER_ROLE, user);
  }

  getToken(): string {
    if (sessionStorage.getItem('token') != null) {
      return sessionStorage.getItem(TOKEN_KEY);
    }
  }

  getUser(): string {
    if (sessionStorage.getItem('role') != null) {
      return sessionStorage.getItem(USER_ROLE);
    }
  }

  saveUserID(userID) {
    window.sessionStorage.removeItem('userID');
    window.sessionStorage.setItem('userID', userID);
    window.localStorage.removeItem('userID');
    window.localStorage.setItem('userID', userID);
  }

  async saveStudentType(userID){
    const studentData = await this.registrationService.getUserByUniId(userID).toPromise().catch(
      err => {
        console.log(err);
      }
    );
    const studentType: string = studentData['data']['gender'];
    window.sessionStorage.removeItem('gender');
    window.sessionStorage.setItem('gender', studentType);
    window.localStorage.removeItem('gender');
    window.localStorage.setItem('gender', studentType);
  }
}
