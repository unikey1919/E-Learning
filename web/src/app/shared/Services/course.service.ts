import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../Models/course.model';
import { Enrollment } from '../Models/enrollment.model';
import { Student } from '../Models/student.model';
import { User } from '../Models/user.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private httpClient: HttpClient) { }
  readonly baseURL = 'https://localhost:44395/api/Courses';
  objectModel: Course = new Course();
  objectEnrollmentModel: Enrollment = new Enrollment();
  objectUserModel: User = new User();
  objectStudentModel: Student = new Student();
  courseid: number;

  GetAllCourse(): Observable<any> {
    return this.httpClient.get(this.baseURL + '/GetAllCourse');
  }

  GetAllCode(): Observable<any> {
    return this.httpClient.get(this.baseURL + '/GetAllCode');
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
  GetCourseByTeacher(objectUserModel): Observable<any> {
    return this.httpClient.post(this.baseURL + '/GetCourseByTeacher', objectUserModel);
  }

  //Lấy danh sách học sinh từ khóa học
  GetStudentByCourse(courseid): Observable<any> {
    return this.httpClient.get(this.baseURL + '/GetStudentByCourse/' + courseid);
  }

  //Lấy danh sách học sinh không ở trong khóa học
  GetStudentNotInCourse(courseid): Observable<any> {
    return this.httpClient.get(this.baseURL + '/GetStudentNotInCourse/' + courseid);
  }

  //Xóa học sinh từ khóa học
  DeleteStudentFromCourse(objectEnrollmentModel): Observable<any>{
    return this.httpClient.post(this.baseURL + '/DeleteStudentFromCourse', objectEnrollmentModel);
  }

  //Xóa danh sách học sinh từ khóa học
  DeleteListStudentFromCourse(listEnrollment): Observable<any>{
    return this.httpClient.post(this.baseURL + '/DeleteListStudentFromCourse', listEnrollment);
  }

  //Thêm khóa học bằng excel
  AddCourseByExcel(listExcel): Observable<any>{
    // let formData = new FormData();
    // formData.append('file', file);
    // console.log(formData)
    // let params = new HttpParams();
    // const options = {
    //   params: params,
    //   reportProgress: true,
    // };
    return this.httpClient.post(this.baseURL + '/AddCourseByExcel', listExcel);
  }

  //Thêm danh sách học sinh từ khóa học
  AddStudentToCourse(addEnrollment): Observable<any>{
    
    return this.httpClient.post(this.baseURL + '/AddStudentToCourse', addEnrollment);
  }

  GetCourseInfo(id:number){
    return this.httpClient.get(this.baseURL + `/GetCourseInfo/${id}`);
  }
}
