import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Forum, ForumModel } from 'src/app/shared/Models/forum';
import { ContentService } from 'src/app/shared/Services/content.service';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css'],
  providers: [MessageService]
})
export class ForumComponent implements OnInit {
  formData: ForumModel = new ForumModel();

  constructor(private router: Router, 
    private contentService: ContentService,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.formData.id = this.activatedRoute.snapshot.params.id;
  }

}
