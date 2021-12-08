import { Assignment, StudentSubmit } from './../../shared/Models/assignment';
import { Component, OnInit, TemplateRef} from '@angular/core';
import { Router } from '@angular/router';
import { CourseContent, FileModel } from 'src/app/shared/Models/course-content';
import { ContentService } from 'src/app/shared/Services/content.service';
import {ActivatedRoute} from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal'; 
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
  providers: [MessageService]
})
export class ContentComponent implements OnInit {
  public Editor = ClassicEditor;
  lstContent: CourseContent[];
  lstFile: FileModel[];
  formData: CourseContent = new CourseContent();
  modalRef: BsModalRef;
  formAddData: Assignment = new Assignment();
  role: string='';
  
  constructor(private router: Router, 
    private contentService: ContentService,
    private activatedRoute: ActivatedRoute, private modalService: BsModalService, 
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.formData.CourseId =this.activatedRoute.snapshot.params.id; 
    this.getContentByCourse(this.formData);
    localStorage.getItem('userRole') == "Instructor" ? this.role = "instructor" : this.role = "student";

  }

  onLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('userRole');
    this.router.navigate(['/user/login']);
  }

  getContentByCourse(formData){
    this.contentService.GetContentByCourse(this.formData).subscribe(
      (res) => {
        this.lstContent = JSON.parse(res.message) as CourseContent[];
        console.log(this.lstContent);
      },
      (error) => {}
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

  downLoadFileContent(id: number, contentType: string){
    this.contentService.DownLoadFileContent(id,contentType).subscribe(
      (res:Blob) => {
        const blob = new Blob([res], { type: contentType }); // you can change the type
        const url= window.URL.createObjectURL(blob);
        window.open(url);
        console.log("Success")
      },
      (error) => {"Error"}
      )
  }

  getAssignmentContent(id: number, subjectId: number){
    let courseId: number;
    courseId = this.activatedRoute.snapshot.params.id;
    this.router.navigate([ `/e-learning/course/assignment/${id}/${subjectId}/${courseId}` ])
  }

  openModalWithClass(template: TemplateRef<any>, subjectId: number) {  
    this.modalRef = this.modalService.show(  
      template,  
      Object.assign({}, { class: 'gray modal-lg', ignoreBackdropClick: true })  
    );  
    this.formAddData.SubjectId =  subjectId;
  } 

  openContentWithClass(template: TemplateRef<any>) {  
    this.modalRef = this.modalService.show(  
      template,  
      Object.assign({}, { class: 'gray modal-lg', ignoreBackdropClick: true })  
    );  
    this.formData.CourseId= this.activatedRoute.snapshot.params.id;
  } 

  closeAddModel(){
      this.modalRef.hide();
  }

  onSubmit(){
    this.formAddData.Opened = new Date(this.formAddData.Opened);
    this.formAddData.Due = new Date(this.formAddData.Due);
    this.formAddData.AssignmentName = this.formAddData.AssignmentName;
    this.contentService.AddAssignmentBySubject(this.formAddData).subscribe(
      (res: any) => {
        if (res.isError == true) {
          this.messageService.add({
            severity: 'error',
            summary: 'error',
            detail: 'Fail to create assignment',
          });
        } else {
          this.closeAddModel();
          this.getContentByCourse(this.formData);
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Assignment is created',
          });
        }
      },
      (err) => {}
    );
  }

  onSubmitContent(){
    this.formData.SubjectName = this.formData.SubjectName;
    this.contentService.AddSubject(this.formData).subscribe(
      (res: any) => {
        if (res.isError == true) {
          this.messageService.add({
            severity: 'error',
            summary: 'error',
            detail: 'Fail to create new subject',
          });
        } else {
          this.closeAddModel();
          this.getContentByCourse(this.formData);
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Subject is created',
          });
        }
      },
      (err) => {}
    );
  }
}
