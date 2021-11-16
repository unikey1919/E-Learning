import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Instructor } from '../Models/instructor.model';
import { User } from '../Models/user.model';

@Injectable({
  providedIn: 'root'
})
export class InstructorService {

  constructor(private httpClient: HttpClient) { }
  readonly baseURL = 'https://localhost:44395/api/Instructors';
  objectModel: Instructor = new Instructor();
  objectUserModel: User = new User();
  listInstructor: Object[];
  GetAllInstructor(): Observable<any> {
    return this.httpClient.get(this.baseURL + '/GetAllInstructor');
  }

  GetListUser(): Observable<any>{
    return this.httpClient.get(this.baseURL + '/GetListUser');
  }

  AddInstructor(listInstructor): Observable<any>{
    return this.httpClient.post(this.baseURL + '/AddInstructor', listInstructor);
  }

  UpdateInstructor(objectModel): Observable<any>{
    return this.httpClient.post(this.baseURL + '/UpdateInstructor', objectModel);
  }

  DelInstructor(objectModel): Observable<any>{
    return this.httpClient.post(this.baseURL + '/DelInstructor', objectModel);
  }
}
