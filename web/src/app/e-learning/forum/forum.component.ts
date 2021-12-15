import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Discussion, DiscussionModel, Forum, ForumModel } from 'src/app/shared/Models/forum';
import { ContentService } from 'src/app/shared/Services/content.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css'],
  providers: [MessageService]
})
export class ForumComponent implements OnInit {
  public Editor = ClassicEditor;
  formData: ForumModel = new ForumModel();
  formDiscussion: Discussion = new Discussion();
  modalRef: BsModalRef;
  lstDiscussion: DiscussionModel[];

  constructor(private router: Router, 
    private contentService: ContentService,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,private modalService: BsModalService,) { }

  ngOnInit(): void {
    this.formData.id = this.activatedRoute.snapshot.params.id;
    this.getDiscussByForum();
    this.getForum();
  }

  onSubmitDiscussion(){
    this.formDiscussion.forumId = this.activatedRoute.snapshot.params.id;
    this.contentService.AddDiscussBySubjectForum(this.formDiscussion).subscribe(
      (res: any) => {
        if (res.isError == true) {
          this.closeAddModel();
          this.messageService.add({
            severity: 'error',
            summary: 'error',
            detail: 'Fail to create discussion',
          });
        } else {
          this.getDiscussByForum();
          this.closeAddModel();
          // this.getContentByCourse(this.formData);
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Discussion is created',
          });
        }
      },
      (err) => {}
    );
  }

  openModalWithClass(template: TemplateRef<any>){
    this.modalRef = this.modalService.show( template,  
      Object.assign({}, { class: 'gray modal-lg', ignoreBackdropClick: true })  
    );  
  }

  closeAddModel(){
    this.modalRef.hide();
    this.formDiscussion = new Discussion();
  }

  getDiscussByForum(){
    var forumId = this.activatedRoute.snapshot.params.id;
    this.contentService.GetDiscussByForum(forumId).subscribe(
      (res) => {
        this.lstDiscussion = JSON.parse(res.message) as DiscussionModel[];
        console.log(this.lstDiscussion);
      },
      (error) => {}
    );
  }

  getForum(){
    var forumId = this.activatedRoute.snapshot.params.id;
    this.contentService.GetForum(forumId).subscribe(
      (res) => {
        this.formData = res;
      },
      (error) => {}
    );
  }

  getDiscussionContent(id: number){
    var courseId = this.activatedRoute.snapshot.params.courseId;
    var subjectId = this.activatedRoute.snapshot.params.subjectId;
    var forumId = this.activatedRoute.snapshot.params.id;
    this.router.navigate([ `/e-learning/course/discussion/${id}/${forumId}/${subjectId}/${courseId}` ])
  }
}
