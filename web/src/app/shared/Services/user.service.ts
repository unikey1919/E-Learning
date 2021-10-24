import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../Models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }
  readonly baseURL = 'https://localhost:44395/api/User'
  formData: User = new User();

  register(userName: string, email: string, passWord: string, fullName:string) : Observable<any>{
    this.formData.userName = userName;
    this.formData.fullName = fullName;
    this.formData.password = passWord;
    this.formData.email = email;
    return this.httpClient.post(this.baseURL + '/Register', this.formData);
  }
}
