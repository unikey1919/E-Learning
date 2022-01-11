import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from '../shared/Models/course.model';
import { User } from '../shared/Models/user.model';
import { CourseService } from '../shared/Services/course.service';
import { UserProfileService } from '../shared/Services/user-profile.service';
import { EventSettingsModel, DayService, WeekService, WorkWeekService, MonthService, AgendaService } from '@syncfusion/ej2-angular-schedule';
@Component({
  selector: 'app-home',
  providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})

export class HomeComponent implements OnInit {
public selectedDate: Date = new Date(2018, 1, 15);
public eventSettings: EventSettingsModel = {
    dataSource: [
    {
        Id: 1,
        Subject: 'Explosion of Betelgeuse Star',
        StartTime: new Date(2018, 1, 15, 9, 30),
        EndTime: new Date(2018, 1, 15, 11, 0)
    }, {
        Id: 2,
        Subject: 'Thule Air Crash Report',
        StartTime: new Date(2018, 1, 12, 12, 0),
        EndTime: new Date(2018, 1, 12, 14, 0)
    }, {
        Id: 3,
        Subject: 'Blue Moon Eclipse',
        StartTime: new Date(2018, 1, 13, 9, 30),
        EndTime: new Date(2018, 1, 13, 11, 0)
    }, {
        Id: 4,
        Subject: 'Meteor Showers in 2018',
        StartTime: new Date(2018, 1, 14, 13, 0),
        EndTime: new Date(2018, 1, 14, 14, 30)
    }]
};
  lstCourse: Course[];
  formData: User = new User();
  role: string = '';
  username: any;
  avatar: any;
  constructor(private router: Router, private courseService: CourseService, private userProfileService: UserProfileService) { }

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


}
