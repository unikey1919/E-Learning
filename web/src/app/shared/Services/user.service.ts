import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login, User } from '../Models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }
  readonly baseURL = 'https://localhost:44395/api/User';
  formData: User = new User();
  formDataLogin: Login = new Login();

  register(userName: string, email: string, passWord: string, fullName:string) : Observable<any>{
    this.formData.userName = userName;
    this.formData.fullName = fullName;
    this.formData.password = passWord;
    this.formData.email = email;
    return this.httpClient.post(this.baseURL + '/Register', this.formData);
  }

  login(userName: string, passWord: string, email): Observable<any> {
    this.formDataLogin.userName = userName;
    this.formDataLogin.password = passWord;
    this.formDataLogin.email = email;
    return this.httpClient.post(this.baseURL + '/Login', this.formDataLogin);
  }

  roleMatch(allowedRoles): boolean {
    var isMatch = false;
    var payLoad = JSON.parse(window.atob(localStorage.getItem('token')!.split('.')[1]));
    var userRole = payLoad.role;
    allowedRoles.forEach((element: any) => {
      if (userRole == element) {
        isMatch = true;
        return false;
      }
      return false;
    });
    return isMatch;
  }
}
