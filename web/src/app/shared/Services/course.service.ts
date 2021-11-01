import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private httpClient: HttpClient) { }
  readonly baseURL = 'https://localhost:44395/api/Course';
  
  GetAllCourse(): Observable<any> {
    return this.httpClient.get(this.baseURL + '/GetAllCourse');
  }
}
