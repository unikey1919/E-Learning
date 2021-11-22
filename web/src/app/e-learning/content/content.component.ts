import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseContent, FileModel } from 'src/app/shared/Models/course-content';
import { ContentService } from 'src/app/shared/Services/content.service';
import {ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  lstContent: CourseContent[];
  lstFile: FileModel[];
  formData: CourseContent = new CourseContent();
  constructor(private router: Router, 
    private contentService: ContentService,
    private activatedRoute: ActivatedRoute) { }

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

}
