import { Component, OnInit } from '@angular/core';
import { PaymentDetailService } from '../shared/payment-detail.service';

@Component({
  selector: 'app-e-learning',
  templateUrl: './e-learning.component.html',
  styles: [
  ]
})
export class ELearningComponent implements OnInit {

  constructor(public service:PaymentDetailService) { }

  ngOnInit(): void {
  }

}
