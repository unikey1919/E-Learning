import { Assignment, StudentSubmit } from './../../shared/Models/assignment';
import { Component, OnInit, TemplateRef} from '@angular/core';
import { Router } from '@angular/router';
import { CourseContent, FileModel, Video, VideoModel} from 'src/app/shared/Models/course-content';
import { ContentService } from 'src/app/shared/Services/content.service';
import {ActivatedRoute} from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal'; 
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { MessageService } from 'primeng/api';
import { Forum } from 'src/app/shared/Models/forum';
import { ChatService } from 'src/app/shared/Services/chat.service';
import { Course, CourseModel } from 'src/app/shared/Models/course.model';
import { CourseService } from 'src/app/shared/Services/course.service';

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
  files: any[] = [];
  formForumData: Forum = new Forum();
  formVideoData: Video = new Video();
  modelVideo: VideoModel = new VideoModel();
  courseInfo: CourseModel = new CourseModel();
  
  constructor(private router: Router, 
    private contentService: ContentService,
    private activatedRoute: ActivatedRoute, private modalService: BsModalService, 
    private messageService: MessageService,private chatService: ChatService,
    private courseService: CourseService) { }

  ngOnInit(): void {
    this.formData.CourseId =this.activatedRoute.snapshot.params.id; 
    this.getContentByCourse(this.formData);
    this.getCourseInfo();
    localStorage.getItem('userRole') == "Instructor" ? this.role = "instructor" : this.role = "student";
    
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);
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

  getForumContent(id: number, subjectId: number){
    let courseId: number;
    courseId = this.activatedRoute.snapshot.params.id;
    this.router.navigate([ `/e-learning/course/forum/${id}/${subjectId}/${courseId}` ])
  }

  openModalWithClass(template: TemplateRef<any>, subjectId: number) { 
    this.formAddData = new Assignment(); 
    this.formForumData = new Forum();
    this.formVideoData = new Video();
    this.modalRef = this.modalService.show(  
      template,  
      Object.assign({}, { class: 'gray modal-lg', ignoreBackdropClick: true })  
    );  
    this.formAddData.SubjectId =  subjectId;
    this.formForumData.SubjectId =  subjectId;
    this.formVideoData.SubjectId =  subjectId;
  }
  
  openModalWithVideo(template: TemplateRef<any>, Id: number) { 
    this.modalRef = this.modalService.show(  
      template,  
      Object.assign({}, { class: 'gray modal-lg', ignoreBackdropClick: true })  
    );
    this.contentService.GetVideoInfo(Id).subscribe(
      (res) => {
        this.modelVideo = res as VideoModel;
        console.log(this.modelVideo.youtubeLink);
      },
      (error) => {}
    )  
  } 

  openContentWithClass(template: TemplateRef<any>) {  
    this.modalRef = this.modalService.show(  
      template,  
      Object.assign({}, { class: 'gray modal-lg', ignoreBackdropClick: true })  
    );  
    this.formData.CourseId= this.activatedRoute.snapshot.params.id;
  } 

  openModelWithItem(template: TemplateRef<any>,formAddData) {  
    this.modalRef = this.modalService.show(  
      template,  
      Object.assign({}, { class: 'gray modal-lg', ignoreBackdropClick: true })  
    );  
    this.formAddData = formAddData;
    this.formForumData = formAddData;
    this.formVideoData = formAddData;
    //Đặt link video trống khi edit
    this.formVideoData.YoutubeLink = ''; 
  } 

  closeAddModel(){
      this.modalRef.hide();
      this.formAddData = new Assignment(); 
      this.formForumData = new Forum(); 
      this.formVideoData = new Video();
  }

  closeModel(){
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
          this.chatService.SendSMS(this.formAddData.SubjectId).subscribe();
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

  onSelect(event) {
		console.log(event);
		this.files.push(...event.addedFiles);
    console.log(this.files);
	}

	onRemove(event) {
		console.log(event);
		this.files.splice(this.files.indexOf(event), 1);
	}

  onSubmitFile(subjectId){
    this.closeAddModel();
    console.log(this.files);
    this.contentService.UploadFile(this.files,-1,"",subjectId).subscribe(
      (res) => {
        this.getContentByCourse(this.formData);
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Successful submission',
        });
      },
      (error) => {}
    )
  }

  onDeleteFile(file: FileModel) {
    this.contentService.DelFile(file).subscribe(
      (res: any) => {
        if (res.isError == true) {
          this.messageService.add({
            severity: 'error',
            summary: 'error',
            detail: 'Fail to delete File',
          });
        }
        else{
          this.getContentByCourse(this.formData);
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'File is deleted',
          });
        }
      },
      (error) => {}
    );
  }

  onDeleteAssignment(assignment: Assignment) {
    this.contentService.DelAssignment(assignment).subscribe(
      (res: any) => {
        if (res.isError == true) {
          this.messageService.add({
            severity: 'error',
            summary: 'error',
            detail: 'Fail to delete Assignment',
          });
        }
        else{
          this.getContentByCourse(this.formData);
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Assignment is deleted',
          });
        }
      },
      (error) => {}
    );
  }

  onEditAssignment(assignment: Assignment) {
    this.closeAddModel();
    this.contentService.UpdateAssignment(assignment).subscribe(
      (res: any) => {
        if (res.isError == true) {
          this.messageService.add({
            severity: 'error',
            summary: 'error',
            detail: 'Fail to edit Assignment',
          });
        }
        else{
          this.getContentByCourse(this.formData);
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Assignment is edited',
          });
        }
      },
      (error) => {}
    );
  }

  onSubmitForum(){
    this.formForumData.ForumName;
    this.contentService.AddForumBySubject(this.formForumData).subscribe(
      (res: any) => {
        if (res.isError == true) {
          this.messageService.add({
            severity: 'error',
            summary: 'error',
            detail: 'Fail to create new forum',
          });
        } else {
          this.closeAddModel();
          this.getContentByCourse(this.formData);
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Forum is created',
          });
        }
      },
      (err) => {}
    );
  }

  onDeleteForum(forum: Forum) {
    this.contentService.DelForum(forum).subscribe(
      (res: any) => {
        if (res.isError == true) {
          this.messageService.add({
            severity: 'error',
            summary: 'error',
            detail: 'Fail to delete Forum',
          });
        }
        else{
          this.getContentByCourse(this.formData);
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Forum is deleted',
          });
        }
      },
      (error) => {}
    );
  }

  onEditForum(forum: Forum) {
    this.closeAddModel();
    this.contentService.UpdateForum(forum).subscribe(
      (res: any) => {
        if (res.isError == true) {
          this.messageService.add({
            severity: 'error',
            summary: 'error',
            detail: 'Fail to edit Forum',
          });
        }
        else{
          this.getContentByCourse(this.formData);
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Forum is edited',
          });
        }
      },
      (error) => {}
    );
  }

  onSubmitVideo(){
    this.contentService.AddVideoBySubject(this.formVideoData).subscribe(
      (res: any) => {
        if (res.isError == true) {
          this.messageService.add({
            severity: 'error',
            summary: 'error',
            detail: 'Fail to create new video',
          });
        } else {
          this.closeAddModel();
          this.getContentByCourse(this.formData);
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Video is created',
          });
        }
      },
      (err) => {}
    );
  }

  onDeleteVideo(video: Video) {
    this.contentService.DelVideo(video).subscribe(
      (res: any) => {
        if (res.isError == true) {
          this.messageService.add({
            severity: 'error',
            summary: 'error',
            detail: 'Fail to delete video',
          });
        }
        else{
          this.getContentByCourse(this.formData);
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Video is deleted',
          });
        }
      },
      (error) => {}
    );
  }

  onEditVideo(video: Video) {
    this.closeAddModel();
    this.contentService.UpdateVideo(video).subscribe(
      (res: any) => {
        if (res.isError == true) {
          this.messageService.add({
            severity: 'error',
            summary: 'error',
            detail: 'Fail to edit video',
          });
        }
        else{
          this.getContentByCourse(this.formData);
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Video is edited',
          });
        }
      },
      (error) => {}
    );
  }

  getCourseInfo(){
    this.courseService.GetCourseInfo(this.formData.CourseId).subscribe(
      (res:any) => {
        this.courseInfo = res;
      },
      (error) => {}
    )
  }
}
