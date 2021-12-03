import { Assignment, AssignmentModel } from './../../shared/Models/assignment';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { BsModalService } from 'ngx-bootstrap/modal';
import { MessageService } from 'primeng/api';
import { ContentService } from 'src/app/shared/Services/content.service';
import { FileModel } from 'src/app/shared/Models/course-content';

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

  constructor(private router: Router, 
    private contentService: ContentService,
    private activatedRoute: ActivatedRoute, private modalService: BsModalService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.formData.id =this.activatedRoute.snapshot.params.id;
    console.log(this.activatedRoute.snapshot.params.subjectId);
    this.getAssignmentBySubject(this.formData.id);
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
    this.contentService.UploadFile(this.files,this.activatedRoute.snapshot.params.subjectId).subscribe(
      (res) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Successful submission',
        });
      },
      (error) => {}
    )
  }

}
