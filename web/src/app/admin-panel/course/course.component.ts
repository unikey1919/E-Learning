import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from 'src/app/shared/Models/course.model';
import { CourseService } from 'src/app/shared/Services/course.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  formData: Course = new Course();
  lstCourse: Course[];

  constructor(private router: Router, private courseService: CourseService) { }

  ngOnInit(): void {
  }

  getListCourse(){
    this.courseService.GetAllCourse().subscribe(
      res => {
        this.lstCourse = JSON.parse(res.message) as Course[];
      },
      error =>{

      }
    );
  }

}
