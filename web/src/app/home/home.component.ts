import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from '../shared/Models/course.model';
import { User } from '../shared/Models/user.model';
import { CourseService } from '../shared/Services/course.service';
import { UserProfileService } from '../shared/Services/user-profile.service';let userName : string ='';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  lstCourse: Course[];

  formData: User = new User();
  constructor(private router: Router, private courseService: CourseService, private userProfileService: UserProfileService) { }

  ngOnInit(): void {
    this.userProfileService.getUserProfile().subscribe(
      res => {
        this.formData.userName = res.userName;
        this.formData.fullName = res.fullName;
        this.formData.email = res.email;
        this.getListCourseByStudent(res);
      },
      err => {
        console.log(err);
      },
    );
    
  }

  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/user/login']);
  }

  getListCourseByStudent(formData) {
    this.courseService.GetCourseByStudent(formData).subscribe(
      (res) => {
        this.lstCourse = JSON.parse(res.message) as Course[];
      },
      (error) => {}
    );
  }

}