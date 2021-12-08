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

  DownLoadFileAssignment(id: number, contentType: string){
    return this.httpClient.get(this.baseURL+`/DownloadAssignment/${id}`, {responseType: 'blob'});
  }

  AddAssignmentBySubject(assignmentObjModel): Observable<any>{
    return this.httpClient.post(this.baseURL + '/AddAssignmentBySubject', assignmentObjModel);
  }

  AddSubject(ObjModel): Observable<any>{
    return this.httpClient.post(this.baseURL + '/AddSubject', ObjModel);
  }

  GetAssignmentBySubject(id: number){
    return this.httpClient.get(this.baseURL + `/GetAssignmentBySubject/${id}`);
  }

  UploadFile(files: File[], assignmentId:number, userSubmit: string): Observable<any>{
    const formData = new FormData();
    files.forEach(element => formData.append('files', element));
    formData.append('assignmentId', assignmentId.toString());
    formData.append('submitUser', userSubmit.toString());
    return this.httpClient.post(this.baseURL, formData);
  }

  GetAssignmentSubmitStatus(id: string, assignmentId:number){
    return this.httpClient.get(this.baseURL + `/GetAssignmentSubmitStatus/${id}/${assignmentId}`);
  }

  GetAssignmentSubmit(id: string, assignmentId:number){
    return this.httpClient.get(this.baseURL + `/GetAssignmentSubmit/${id}/${assignmentId}`);
  }

  GetLstAssignmentSubmit(assignmentId:number){
    return this.httpClient.get(this.baseURL + `/GetLstAssignmentSubmit/${assignmentId}`);
  }

  GetAllStudentSubmit(courseId:number, assignmentId:number){
    return this.httpClient.get(this.baseURL + `/GetAllStudentSubmit/${courseId}/${assignmentId}`);
  }
}
