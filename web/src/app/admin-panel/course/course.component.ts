import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Course } from 'src/app/shared/Models/course.model';
import { CourseService } from 'src/app/shared/Services/course.service';

const lstCourse: Course[] = [];
@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})


export class CourseComponent implements OnInit {
  showMe: boolean = false;
  formData: Course = new Course();
  displayedColumns: string[] = ['position','course', 'code', 'instructorId', 'instructor', 'description', 'details','actions'];
  public dataSource = new MatTableDataSource<Course>();
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(private router: Router, private courseService: CourseService, private toastr: ToastrService) { }

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

  onSubmit() {
    this.courseService.AddCourse(this.formData).subscribe(
      (res: any) => {
        if(res.isError == true){
          this.toastr.success('New course created!', 'Create successful.');
        }
        else 
        {  this.toastr.success('New course created!', 'alo successful.');}
       
        this.getListCourse();
      },
      err => {
        this.toastr.error('Create course fail!');
      }
    );
  }

  showHide() {
    this.showMe = !this.showMe;
  }

  showSpinner(time?) {
    console.log(time);
    this.spinner.show();
    if (time !== null) {
      this.loadingText = 'Spin for 5 seconds';
      setTimeout(() => {
        this.spinner.hide();
      }
        , 2000)
    } else{
      this.loadingText = 'Spin for unlimited times';
      
    }
  }

}
