import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaymentDetail } from './payment-detail.model';
@Injectable({
  providedIn: 'root'
})
export class PaymentDetailService {

  constructor(private httpClient: HttpClient) { }
  
  readonly baseURL = 'https://localhost:44395/api/PaymentDetails'
  formData: PaymentDetail = new PaymentDetail();

  postPaymentDetails(){
    return this.httpClient.post(this.baseURL, this.formData)
  }
}
