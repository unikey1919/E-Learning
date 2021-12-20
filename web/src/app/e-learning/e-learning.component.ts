import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Room } from '../shared/Models/chat';
import { ChatService } from '../shared/Services/chat.service';
import { PaymentDetailService } from '../shared/Services/payment-detail.service';
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
    ,private chatService: ChatService) { }

  ngOnInit(): void {
    console.log(this.activatedRoute);
    localStorage.getItem('userRole') == "Instructor" ? this.role = "instructor" : this.role = "student";
    this.username = localStorage.getItem('username');
    this.avatar = localStorage.getItem('img');
  }

  onLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('userRole');
    localStorage.removeItem('email');
    localStorage.removeItem('img');
    this.router.navigate(['/']);
  }

  openForm() {
    (document.getElementById("myForm") as HTMLFormElement).style.display = "block";
  }


}
