import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { CourseContent, FileModel } from '../Models/course-content';
import { Observable } from 'rxjs';
import { Assignment, FileAssignment, FileAssignmentSubmit } from '../Models/assignment';


@Injectable({
  providedIn: 'root'
})
export class ContentService {

  constructor(private httpClient: HttpClient) { }
  readonly baseURL = 'https://localhost:44395/api/CourseContent';
  objectModel: CourseContent = new CourseContent();
  assignmentObjModel: Assignment = new Assignment();
  objectFileModel: FileModel = new FileModel();
  objectFileSubmitModel: FileAssignmentSubmit = new FileAssignmentSubmit();
  

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

  UpdateAssignment(assignmentObjModel): Observable<any>{
    return this.httpClient.post(this.baseURL + '/UpdateAssignment', assignmentObjModel);
  }

  DelAssignment(assignmentObjModel): Observable<any>{
    return this.httpClient.post(this.baseURL + '/DelAssignment', assignmentObjModel);
  }

  AddSubject(ObjModel): Observable<any>{
    return this.httpClient.post(this.baseURL + '/AddSubject', ObjModel);
  }

  GetAssignmentBySubject(id: number){
    return this.httpClient.get(this.baseURL + `/GetAssignmentBySubject/${id}`);
  }

  UploadFile(files: File[], assignmentId:number, userSubmit: string, subjectId:number): Observable<any>{
    const formData = new FormData();
    files.forEach(element => formData.append('files', element));
    formData.append('assignmentId', assignmentId.toString());
    formData.append('submitUser', userSubmit.toString());
    formData.append('subjectId', subjectId.toString());
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

  DelFile(ObjectFileModel): Observable<any>{
    return this.httpClient.post(this.baseURL + '/DelFile', ObjectFileModel);
  }

  DelFileSubmit(userSubmit: string, assignmentId:number): Observable<any>{
    this.objectFileSubmitModel.AssignmentId = assignmentId;
    this.objectFileSubmitModel.UserSubmit = userSubmit;
    return this.httpClient.post(this.baseURL + '/DelFileSubmit', this.objectFileSubmitModel);
  }
}
