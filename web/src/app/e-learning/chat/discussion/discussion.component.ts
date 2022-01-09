import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ContentService } from 'src/app/shared/Services/content.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Answer, AnswersModel, DiscussionModel, ForumModel } from 'src/app/shared/Models/forum';
@Component({
  selector: 'app-discussion',
  templateUrl: './discussion.component.html',
  styleUrls: ['./discussion.component.css'],
  providers: [MessageService]
})
export class DiscussionComponent implements OnInit {
  public Editor = ClassicEditor;
  formData: DiscussionModel[];
  formForumData: ForumModel= new ForumModel();
  lstAnswer: AnswersModel[];
  formReply: AnswersModel = new AnswersModel();
  role:string='';
  isReply: Boolean;
  mapReply: number = 0;

  constructor(private router: Router, 
    private contentService: ContentService,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,private modalService: BsModalService) { }

  ngOnInit(): void {
    localStorage.getItem('userRole') == "Instructor" ? this.role = "instructor" : this.role = "student";
    this.getDiscuss();
    this.getForum();
    this.getAnswer();
  }

  getDiscuss(){
    var forumId = this.activatedRoute.snapshot.params.forumId;
    var id = this.activatedRoute.snapshot.params.id;
    this.contentService.GetDiscuss(forumId,id).subscribe(
      (res) => {
      this.formData = JSON.parse(res.message) as DiscussionModel[];
      console.log(this.formData);
    },
    (error) => {});
  }

  getForum(){
    var forumId = this.activatedRoute.snapshot.params.forumId;
    this.contentService.GetForum(forumId).subscribe(
      (res) => {
        this.formForumData = res;
      },
      (error) => {}
    );
  }

  getAnswer(){
    var id = this.activatedRoute.snapshot.params.id;
    this.contentService.GetAnswer(id).subscribe(
      (res) => {
        this.lstAnswer = res as AnswersModel[];
        //push list reply vào từng answer
        this.lstAnswer.forEach(element => this.contentService.GetAnswerReply(element.reply).subscribe(
          (res)=>{
            element.answer = res as Answer[];
          },
          (error) => {}
        ))
        console.log(this.lstAnswer);
      },
      (error) => {}
    )
  }

  onReply(type,answer) {
    this.mapReply = answer;
    if(type == 1)  this.isReply = true;
    else{
      this.formReply = new AnswersModel();
      this.isReply = false;
    }
  }

  onSubmit(reply: number){
    var discussId = this.activatedRoute.snapshot.params.id;
    this.formReply.discussId = discussId;
    this.formReply.reply = reply;
    this.contentService.AddAnswer(this.formReply).subscribe(
      (res: any) => {
        if (res.isError == true) {
          this.messageService.add({
            severity: 'error',
            summary: 'error',
            detail: 'Fail to reply',
          });
        } else {
          this.getAnswer();
          this.isReply = false;
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Success',
          });
        }
      },
      (err) => {})

  }
}
