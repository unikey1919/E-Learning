import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  @ViewChild(ChatComponent) child;
  constructor(public service:PaymentDetailService,private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    console.log(this.activatedRoute);
  }

  onLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('userRole');
    localStorage.removeItem('email');
    this.router.navigate(['/']);
  }

  openForm() {
    (document.getElementById("myForm") as HTMLFormElement).style.display = "block";
  }

}
