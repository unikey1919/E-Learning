import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { CourseContent, FileModel, Video } from '../Models/course-content';
import { Observable } from 'rxjs';
import { Assignment, FileAssignment, FileAssignmentSubmit } from '../Models/assignment';
import { Answer, AnswersModel, Discussion, Forum } from '../Models/forum';


@Injectable({
  providedIn: 'root'
})
export class ContentService {

  constructor(private httpClient: HttpClient) { }
  readonly baseURL = 'https://localhost:44395/api/CourseContent';
  objectModel: CourseContent = new CourseContent();
  assignmentObjModel: Assignment = new Assignment();
  forumObjModel: Forum = new Forum();
  discussionObjModel: Discussion = new Discussion();
  objectFileModel: FileModel = new FileModel();
  objectFileSubmitModel: FileAssignmentSubmit = new FileAssignmentSubmit();
  objVideoModel: Video = new Video();
  ObjAnswerModel: AnswersModel = new AnswersModel();
  

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

  GetForum(id:number): Observable<any>{
    return this.httpClient.get(this.baseURL + `/GetForum/${id}`);
  }

  AddForumBySubject(forumObjModel): Observable<any>{
    return this.httpClient.post(this.baseURL + '/AddForumBySubject', forumObjModel);
  }

  DelForum(forumObjModel): Observable<any>{
    return this.httpClient.post(this.baseURL + '/DelForum', forumObjModel);
  }

  UpdateForum(forumObjModel): Observable<any>{
    return this.httpClient.post(this.baseURL + '/UpdateForum', forumObjModel);
  }

  GetDiscussByForum(forumId: number): Observable<any>{
    return this.httpClient.get(this.baseURL + `/GetDiscussByForum/${forumId}`);
  }

  GetDiscuss(forumId: number, id: number): Observable<any>{
    return this.httpClient.get(this.baseURL + `/GetDiscuss/${forumId}/${id}`);
  }

  AddDiscussBySubjectForum(discussionObjModel): Observable<any>{
    return this.httpClient.post(this.baseURL + '/AddDiscussBySubject', discussionObjModel);
  }

  DelDiscuss(discussionObjModel): Observable<any>{
    return this.httpClient.post(this.baseURL + '/DelDiscuss', discussionObjModel);
  }

  GetAnswer(discussId: number): Observable<any>{
    return this.httpClient.get(this.baseURL + `/GetAnswer/${discussId}`);
  }

  GetAnswerReply(id: number): Observable<any>{
    return this.httpClient.get(this.baseURL + `/GetAnswerReply/${id}`);
  }

  AddAnswer(ObjAnswerModel): Observable<any>{
    return this.httpClient.post(this.baseURL + '/AddAnswer', ObjAnswerModel);
  }

  AddVideoBySubject(objVideoModel): Observable<any>{
    return this.httpClient.post(this.baseURL + '/AddVideoBySubject', objVideoModel);
  }

  GetVideoInfo(Id:number){
    return this.httpClient.get(this.baseURL + `/GetVideoInfo/${Id}`);
  }

  UpdateVideo(objVideoModel): Observable<any>{
    return this.httpClient.post(this.baseURL + '/UpdateVideo', objVideoModel);
  }

  DelVideo(objVideoModel): Observable<any>{
    return this.httpClient.post(this.baseURL + '/DelVideo', objVideoModel);
  }

  AddQuizBySubject(quizObjModel): Observable<any> {
    return this.httpClient.post(this.baseURL + '/AddQuizBySubject', quizObjModel);
  }

  UpdateQuiz(quizObjModel): Observable<any> {
    return this.httpClient.post(this.baseURL + '/UpdateQuiz', quizObjModel);
  }

  DelQuiz(quizObjModel): Observable<any> {
    return this.httpClient.post(this.baseURL + '/DelQuiz', quizObjModel);
  }
  GetQuizBySubject(id: number) {
    return this.httpClient.get(this.baseURL + `/GetQuizBySubject/${id}`);
  }

  GetListQuestionByQuiz(id: number) {
    return this.httpClient.get(this.baseURL + `/GetListQuestionByQuiz/${id}`);
  }

  GetCountQuestion(id: number) {
    return this.httpClient.get(this.baseURL + `/GetCountQuestion/${id}`);
  }

  GetStudentId(username: string | null) {
    return this.httpClient.get(this.baseURL + `/GetStudentId/${username}`);
  }

  GetResult(quizid:number, courseid:number, studentid:number){
    return this.httpClient.get(this.baseURL + `/GetResult/${quizid}/${courseid}/${studentid}`);
  }

  GetStudentNotDoQuiz(courseid:number, quizid:number){
    return this.httpClient.get(this.baseURL + `/GetStudentNotDoQuiz/${courseid}/${quizid}`);
  }

  GetStudentDoQuiz(courseid:number, quizid:number){
    return this.httpClient.get(this.baseURL + `/GetStudentDoQuiz/${courseid}/${quizid}`);
  }
  AddQuestion(objectModel): Observable<any> {
    return this.httpClient.post(this.baseURL + '/AddQuestion', objectModel);
  }

  //Th??m c??u h???i b???ng excel
  AddQuestionByExcel(listExcel): Observable<any>{
    return this.httpClient.post(this.baseURL + '/AddQuestionByExcel', listExcel);
  }

  AddResult(objectModel): Observable<any> {
    return this.httpClient.post(this.baseURL + '/AddResult', objectModel);
  }

  UpdateQuestion(objectModel): Observable<any> {
    return this.httpClient.post(this.baseURL + '/UpdateQuestion', objectModel);
  }

  UpdateQuizShowScore(objectModel): Observable<any> {
    return this.httpClient.post(this.baseURL + '/UpdateQuizShowScore', objectModel);
  }

  DelQuestion(objectModel): Observable<any> {
    return this.httpClient.post(this.baseURL + '/DelQuestion', objectModel);
  }
  GetAssignmentByEmail(username: string){
    return this.httpClient.get(this.baseURL + `/GetAssignmentByEmail/${username}`);
  }
}
