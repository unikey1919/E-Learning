import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  constructor(private httpClient: HttpClient) { }
  readonly baseURL = 'https://localhost:44395/api/Email';

  SendEmail(toEmail: string, subject: string, body: string): Observable<any>{
    const formData: FormData = new FormData();
    formData.append('toEmail',toEmail);
    formData.append('subject',subject);
    formData.append('body',body);
    return this.httpClient.post(this.baseURL + '/Send', formData);
  }
}
