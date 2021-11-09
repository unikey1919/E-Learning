import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../Models/course.model';
import { User } from '../Models/user.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private httpClient: HttpClient) { }
  readonly baseURL = 'https://localhost:44395/api/Courses';
  objectModel: Course = new Course();
  objectUserModel: User = new User();
  GetAllCourse(): Observable<any> {
    return this.httpClient.get(this.baseURL + '/GetAllCourse');
  }

  AddCourse(objectModel): Observable<any>{
    return this.httpClient.post(this.baseURL + '/AddCourse', objectModel);
  }

  UpdateCourse(objectModel): Observable<any>{
    return this.httpClient.post(this.baseURL + '/UpdateCourse', objectModel);
  }

  DelCourse(objectModel): Observable<any>{
    return this.httpClient.post(this.baseURL + '/DelCourse', objectModel);
  }

  GetCourseByStudent(objectUserModel): Observable<any> {
    // var headers = new Headers();
    // headers.append('Content-Type', 'application/x-www-form-urlencoded');
    // let urlSearchParams = new URLSearchParams();
    // urlSearchParams.append('username', username);
    // let body = urlSearchParams.toString();
    return this.httpClient.post(this.baseURL + '/GetCourseByStudent', objectUserModel);
  }
}
