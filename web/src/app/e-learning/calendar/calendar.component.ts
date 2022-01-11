import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import { AssignmentByEmail } from 'src/app/shared/Models/assignment';
import { ContentService } from 'src/app/shared/Services/content.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
  };
  username: any;
  constructor(private contentService: ContentService) { }

  ngOnInit(): void {
    this.username = localStorage.getItem('username');
    this.contentService.GetAssignmentByEmail(this.username).subscribe(
      res => {
        this.calendarOptions.events = res as AssignmentByEmail[];
      },
      err => {
        console.log(err);
      },
    )
  }

}
