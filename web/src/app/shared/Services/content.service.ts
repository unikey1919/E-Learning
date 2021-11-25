import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CourseContent } from '../Models/course-content';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  constructor(private httpClient: HttpClient) { }
  readonly baseURL = 'https://localhost:44395/api/CourseContent';
  objectModel: CourseContent = new CourseContent();

  GetContentByCourse(objectModel): Observable<any>{
    return this.httpClient.post(this.baseURL + '/GetContentByCourse', objectModel);
  }

  DownLoadFileContent(id: number, contentType: string){
    return this.httpClient.get(this.baseURL+`/${id}`, {responseType: 'blob'});
  }
}
