import { Assignment } from './../../shared/Models/assignment';
import { Component, OnInit, TemplateRef} from '@angular/core';
import { Router } from '@angular/router';
import { CourseContent, FileModel } from 'src/app/shared/Models/course-content';
import { ContentService } from 'src/app/shared/Services/content.service';
import {ActivatedRoute} from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal'; 
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  public Editor = ClassicEditor;
  lstContent: CourseContent[];
  lstFile: FileModel[];
  formData: CourseContent = new CourseContent();
  modalRef: BsModalRef;
  formAddData: Assignment = new Assignment();
  constructor(private router: Router, 
    private contentService: ContentService,
    private activatedRoute: ActivatedRoute, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.formData.CourseId =this.activatedRoute.snapshot.params.id; 
    this.getContentByCourse(this.formData)
  }

  onLogout() {
    localStorage.removeItem('token');
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

  getAssignmentContent(id: number){
    this.router.navigate([ `/course/assignment/${id}` ])
  }

  openModalWithClass(template: TemplateRef<any>) {  
    this.modalRef = this.modalService.show(  
      template,  
      Object.assign({}, { class: 'gray modal-lg', ignoreBackdropClick: true })  
    );  
  } 

  closeAddModel(){
      this.modalRef.hide()
  }

  onSubmit(){
    if(this.formAddData.Opened = new Date()){
      console.log(this.formAddData.Opened.toISOString());
    }
    else
      console.log(this.formAddData.Opened);
    console.log(this.formAddData.Details);
  }
}
