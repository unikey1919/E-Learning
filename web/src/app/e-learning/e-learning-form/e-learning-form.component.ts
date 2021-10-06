import { Component, OnInit } from '@angular/core';
import { PaymentDetailService } from 'src/app/shared/payment-detail.service';
import { NgForm }   from '@angular/forms';

@Component({
  selector: 'app-e-learning-form',
  templateUrl: './e-learning-form.component.html',
  styles: [
  ]
})
export class ELearningFormComponent implements OnInit {

  constructor(public service:PaymentDetailService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm){
    this.service.postPaymentDetails().subscribe(
      res =>{

      },
      err => {console.log(err);}
      );
  }

}
