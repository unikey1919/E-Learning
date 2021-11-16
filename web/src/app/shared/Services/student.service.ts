import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../Models/student.model';
import { User } from '../Models/user.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private httpClient: HttpClient) { }
  readonly baseURL = 'https://localhost:44395/api/Students';
  objectModel: Student = new Student();
  objectUserModel: User = new User();
  listStudent: Object[];
  GetAllStudent1(): Observable<any> {
    return this.httpClient.get(this.baseURL + '/GetAllStudent1');
  }

  GetListUser(): Observable<any>{
    return this.httpClient.get(this.baseURL + '/GetListUser');
  }

  AddStudent(listStudent): Observable<any>{
    return this.httpClient.post(this.baseURL + '/AddStudent', listStudent);
  }

  UpdateStudent(objectModel): Observable<any>{
    return this.httpClient.post(this.baseURL + '/UpdateStudent', objectModel);
  }

  DelStudent(objectModel): Observable<any>{
    return this.httpClient.post(this.baseURL + '/DelStudent', objectModel);
  }
}
