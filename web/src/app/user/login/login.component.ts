import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/shared/Services/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: []
})
export class LoginComponent implements OnInit {
  formModel = {
    UserName: '',
    Password: ''
  }

  constructor(
    private service: UserService, private router: Router, private toastr:ToastrService){ }
    
  ngOnInit(): void {
    var payLoad;
    if (localStorage.getItem('token') != null)
    payLoad = JSON.parse(window.atob(localStorage.getItem('token')!.split('.')[1]));
    var userRole = payLoad.role;
    if (userRole == 'Student'){
      this.router.navigateByUrl('/home');
    } 
    if (userRole == 'Admin') {
      this.router.navigateByUrl('/admin');
    }
  }

  onSubmit() {
    this.service.login(this.formModel.UserName, this.formModel.Password).subscribe(
      (res: any) => {
        localStorage.setItem('token', res.token);
        var payLoad = JSON.parse(window.atob(localStorage.getItem('token')!.split('.')[1]));
        var userRole = payLoad.role;
        if (userRole == 'Student'){
          this.router.navigateByUrl('/home');
        } 
        if (userRole == 'Admin') {
          this.router.navigateByUrl('/admin');
        }
        // this.router.navigateByUrl('/home');
        
      },
      err => {
        if (err.status == 400)
          this.toastr.error('Incorrect username or password.', 'Authentication failed.');
        if (err.status == 500)
          this.toastr.error('your user is not authorized', 'Authentication failed.'); 
        else
          console.log(err);
      }
    );
  }

}
