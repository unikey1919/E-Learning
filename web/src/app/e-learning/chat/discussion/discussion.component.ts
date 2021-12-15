import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ContentService } from 'src/app/shared/Services/content.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DiscussionModel, ForumModel } from 'src/app/shared/Models/forum';
@Component({
  selector: 'app-discussion',
  templateUrl: './discussion.component.html',
  styleUrls: ['./discussion.component.css'],
  providers: [MessageService]
})
export class DiscussionComponent implements OnInit {
  formData: DiscussionModel[];
  formForumData: ForumModel= new ForumModel();
  constructor(private router: Router, 
    private contentService: ContentService,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,private modalService: BsModalService) { }

  ngOnInit(): void {
    this.getDiscuss();
    this.getForum();
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

}
