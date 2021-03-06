import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from '../shared/Models/course.model';
import { User } from '../shared/Models/user.model';
import { CourseService } from '../shared/Services/course.service';
import { UserProfileService } from '../shared/Services/user-profile.service';
import { Assignment, AssignmentByEmail } from '../shared/Models/assignment';
import { ContentService } from '../shared/Services/content.service';
import { CalendarOptions } from '@fullcalendar/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})

export class HomeComponent implements OnInit {
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
  };
  lstCourse: Course[];
  formData: User = new User();
  formCalendar: AssignmentByEmail [];
  role: string = '';
  username: any;
  avatar: any;
  constructor(private router: Router, private courseService: CourseService, 
    private userProfileService: UserProfileService, private contentService: ContentService) {
     }

  ngOnInit(): void {
    localStorage.getItem('userRole') == "Instructor" ? this.role = "instructor" : this.role = "student";
    this.avatar = localStorage.getItem('img');
    this.username = localStorage.getItem('username');
    this.userProfileService.getUserProfile().subscribe(
      res => {
        this.formData.userName = res.userName;
        this.formData.fullName = res.fullName;
        this.formData.email = res.email;
        this.formData.avatarUrl = res.avatar;
        this.getListCourseByStudent(res);
        localStorage.setItem('username', res.userName);
        localStorage.setItem('email', res.email);
      },
      err => {
        console.log(err);
      },
    );
    this.contentService.GetAssignmentByEmail(this.username).subscribe(
      res => {
        this.calendarOptions.events = res as AssignmentByEmail[];
        console.log(this.formCalendar);
      },
      err => {
        console.log(err);
      },
    )
  }

  onLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('userRole');
    this.router.navigate(['/user/login']);
  }

  getListCourseByStudent(formData) {
    if(localStorage.getItem('userRole') == "Instructor"){
      this.courseService.GetCourseByTeacher(formData).subscribe(
        (res) => {
          this.lstCourse = JSON.parse(res.message) as Course[];
          console.log(this.lstCourse);
        },
        (error) => {}
      );
    }
    else{
      this.courseService.GetCourseByStudent(formData).subscribe(
        (res) => {
          this.lstCourse = JSON.parse(res.message) as Course[];
        },
        (error) => {}
      );
    }
  }

  onCalendar() {
    this.router.navigate(['/e-learning/calendar']);
  }


}
