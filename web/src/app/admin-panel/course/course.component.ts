import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Course } from 'src/app/shared/Models/course.model';
import { CourseService } from 'src/app/shared/Services/course.service';

const lstCourse: Course[] = [];
@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})


export class CourseComponent implements OnInit {
  showMe: boolean = true;
  formData: Course = new Course();
  displayedColumns: string[] = ['position','course', 'code', 'instructorId', 'instructor', 'description', 'details','actions'];
  public dataSource = new MatTableDataSource<Course>();
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(private router: Router, private courseService: CourseService) { }

  ngOnInit(): void{
    this.getListCourse();
  }

  getListCourse(){
    this.courseService.GetAllCourse().subscribe(
      res => {
        this.dataSource.data = JSON.parse(res.message) as Course[];
      },
      error =>{
      }
    );
  }

}
