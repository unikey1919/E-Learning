import { Assignment, AssignmentModel, FileAssignment, StudentSubmit, SubmitStatus } from './../../shared/Models/assignment';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { BsModalService } from 'ngx-bootstrap/modal';
import { MessageService } from 'primeng/api';
import { ContentService } from 'src/app/shared/Services/content.service';
import { FileModel } from 'src/app/shared/Models/course-content';
import { MailService } from 'src/app/shared/Services/mail.service';

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.css'],
  providers: [MessageService]
})
export class AssignmentComponent implements OnInit {
  formData: AssignmentModel = new AssignmentModel();
  Opened: Date =  new Date();
  files: any[] = [];
  fileModel: FileModel[] = [];
  formStatus: SubmitStatus =  new SubmitStatus();
  formFile: FileAssignment[] = [];
  role: string='';
  lstStudentSubmit: StudentSubmit[];

  constructor(private router: Router, 
    private contentService: ContentService,
    private activatedRoute: ActivatedRoute, private modalService: BsModalService,
    private messageService: MessageService, private mailService: MailService) { }

  ngOnInit(): void {
    this.formData.id = this.activatedRoute.snapshot.params.id;
    console.log(this.activatedRoute.snapshot.params.subjectId);
    this.getAssignmentBySubject(this.formData.id);
    this.checkStatusSubmit();
    this.getLstAssignmentSubmit();
    this.getAllStudentSubmit(this.activatedRoute.snapshot.params.courseId, this.activatedRoute.snapshot.params.id);
    localStorage.getItem('userRole') == "Instructor" ? this.role = "instructor" : this.role = "student";
  }

  onLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('userRole');
    this.router.navigate(['/user/login']);
  }

  getAssignmentBySubject(id: number){
    this.contentService.GetAssignmentBySubject(id).subscribe(
      (res) => {
        this.formData = res as AssignmentModel;
        this.Opened = new Date(this.formData.opened);
        console.log(this.formData);
      },
      (error) => {}
    )
  }

  onSelect(event) {
		console.log(event);
		this.files.push(...event.addedFiles);
    console.log(this.files);
	}

	onRemove(event) {
		console.log(event);
		this.files.splice(this.files.indexOf(event), 1);
	}

  onSubmit(){
    console.log(this.files);
    let assignmentId = this.activatedRoute.snapshot.params.id;
    let userSubmit: any;
    let subjectId = this.activatedRoute.snapshot.params.subjectId;
    userSubmit = localStorage.getItem('username');
    this.contentService.UploadFile(this.files,assignmentId,userSubmit,subjectId).subscribe(
      (res) => {
        this.checkStatusSubmit();
        this.sendEmail();
        this.getLstAssignmentSubmit();
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Successful submission',
        });
      },
      (error) => {}
    )
  }

  checkStatusSubmit(){
    let assignmentId = this.activatedRoute.snapshot.params.id;
    let userSubmit: any;
    userSubmit = localStorage.getItem('username');
    this.contentService.GetAssignmentSubmitStatus(userSubmit,assignmentId).subscribe(
      (res) => {
        this.formStatus = res as SubmitStatus;
        console.log(this.formStatus);
      },
      (error) => {}
    )
  }

  getLstAssignmentSubmit(){
    let assignmentId = this.activatedRoute.snapshot.params.id;
    let userSubmit: any;
    userSubmit = localStorage.getItem('username');
    this.contentService.GetAssignmentSubmit(userSubmit,assignmentId).subscribe(
      (res) => {
        this.formFile = res as FileAssignment[];
        console.log(this.formFile);
      },
      (error) => {}
    )
  }

  downLoadFileContent(id: number, contentType: string){
    this.contentService.DownLoadFileAssignment(id,contentType).subscribe(
      (res:Blob) => {
        const blob = new Blob([res], { type: contentType }); // you can change the type
        const url= window.URL.createObjectURL(blob);
        window.open(url);
        console.log("Success")
      },
      (error) => {"Error"}
      )
  }

  getBackgroundColor(type) {
    let color = 'orange';
    if(type == "word"){
      color = 'blue'
    }
    else if(type == "excel"){
      color = 'green'
    }
    switch (type) {
      case 'application/msword':
        color = 'blue';
        break;
      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        color = 'blue';
        break;
      case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
        color = 'green';
        break;
      case 'application/vnd.ms-excel':
        color = 'green';
        break;
      case 'image/png':
        color = 'gray';
        break;
      default:
        break;
    }
    return color;
  }

  getIcon(type){
    let icon = 'fa-file';
    switch (type) {
      case 'application/msword':
        icon = 'fas fa-file-word';
        break;
      case 'application/vnd.ms-excel':
        icon = 'fas fa-file-excel';
        break;
      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        icon = 'fas fa-file-word';
        break;
      case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
        icon = 'fas fa-file-excel';
        break;
      case 'image/png':
        icon = 'fas fa-file-image';
        break;
      default:
        break;
    }
    return icon;
  }

  sendEmail(){
    let toEmail : any;
    toEmail = localStorage.getItem('email');
    let subject = "Nộp bài tập";
    let body = "Bạn đã nộp bài tập, vui lòng không phản hồi lại email này."
    this.mailService.SendEmail(toEmail, subject, body).subscribe();
  }

  getAllStudentSubmit(courseId:number, assignmentId:number){
    this.contentService.GetAllStudentSubmit(courseId, assignmentId).subscribe(
      (res) => {
        this.lstStudentSubmit = res as StudentSubmit[];
        console.log(this.formData);
      },
      (error) => {}
    )
  }

  onSubmitEdit(){
    let assignmentId = this.activatedRoute.snapshot.params.id;
    let userSubmit: any;
    let subjectId = this.activatedRoute.snapshot.params.subjectId;
    userSubmit = localStorage.getItem('username');
    this.contentService.DelFileSubmit(userSubmit, assignmentId).subscribe(
      (res: any) => {
        if (res.isError == true) {
          this.messageService.add({
            severity: 'error',
            summary: 'error',
            detail: 'Fail',
          });
        }
        else{
          //Xóa trc khi edit theo user
          this.contentService.UploadFile(this.files,assignmentId,userSubmit,subjectId).subscribe(
            (res) => {
              this.checkStatusSubmit();
              this.sendEmail();
              this.getLstAssignmentSubmit();
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Successful Edit',
              });
            },
            (error) => {}
          )
        }
      },
      (error) => {}
    );

    
  }
}
