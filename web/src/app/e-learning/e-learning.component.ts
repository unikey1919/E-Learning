import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Room } from '../shared/Models/chat';
import { ChatService } from '../shared/Services/chat.service';
import { PaymentDetailService } from '../shared/Services/payment-detail.service';
import { UserProfileService } from '../shared/Services/user-profile.service';
import { ChatComponent } from './chat/chat.component';

@Component({
  selector: 'app-e-learning',
  templateUrl: './e-learning.component.html',
  styleUrls: ['./e-learning.component.css'],
  styles: [
  ]
})
export class ELearningComponent implements OnInit {
  role: string = '';
  avatar: any;
  username: any;
  @ViewChild(ChatComponent) child;
  constructor(public service:PaymentDetailService,private router: Router, private activatedRoute: ActivatedRoute
    ,private chatService: ChatService, private userProfileService: UserProfileService) { }

  ngOnInit(): void {
    this.userProfileService.getUserProfile().subscribe(
      res => {
        this.username = res.userName;
      },
      err => {
        console.log(err);
      },
    ); 
    localStorage.getItem('userRole') == "Instructor" ? this.role = "instructor" : this.role = "student";
    this.avatar = localStorage.getItem('img');
  }

  onLogout() {
    if (confirm("Are you sure to log out?")) {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      localStorage.removeItem('userRole');
      localStorage.removeItem('email');
      localStorage.removeItem('img');
      this.router.navigate(['/']);
    }
  }

  openForm() {
    (document.getElementById("myForm") as HTMLFormElement).style.display = "block";
  }



}
