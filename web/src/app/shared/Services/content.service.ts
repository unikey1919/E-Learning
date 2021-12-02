import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { CourseContent } from '../Models/course-content';
import { Observable } from 'rxjs';
import { Assignment } from '../Models/assignment';


@Injectable({
  providedIn: 'root'
})
export class ContentService {

  constructor(private httpClient: HttpClient) { }
  readonly baseURL = 'https://localhost:44395/api/CourseContent';
  objectModel: CourseContent = new CourseContent();
  assignmentObjModel: Assignment = new Assignment();
  

  GetContentByCourse(objectModel): Observable<any>{
    return this.httpClient.post(this.baseURL + '/GetContentByCourse', objectModel);
  }

  DownLoadFileContent(id: number, contentType: string){
    return this.httpClient.get(this.baseURL+`/${id}`, {responseType: 'blob'});
  }

  AddAssignmentBySubject(assignmentObjModel): Observable<any>{
    return this.httpClient.post(this.baseURL + '/AddAssignmentBySubject', assignmentObjModel);
  }

  GetAssignmentBySubject(id: number){
    return this.httpClient.get(this.baseURL + `/GetAssignmentBySubject/${id}`);
  }

  UploadFile(files: File[]): Observable<any>{
    const formData = new FormData();
    files.forEach(element => formData.append('files', element));
    return this.httpClient.post(this.baseURL, formData);
  }
}
