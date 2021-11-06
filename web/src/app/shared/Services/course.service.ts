import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../Models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private httpClient: HttpClient) { }
  readonly baseURL = 'https://localhost:44395/api/Courses';
  objectModel: Course = new Course();
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
}
