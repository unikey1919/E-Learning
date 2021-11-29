import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseContent, FileModel } from 'src/app/shared/Models/course-content';
import { ContentService } from 'src/app/shared/Services/content.service';
import {ActivatedRoute} from '@angular/router';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
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

}
