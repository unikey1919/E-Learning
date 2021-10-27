import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/shared/Models/user.model';
import { UserProfileService } from 'src/app/shared/Services/user-profile.service';
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
    if (localStorage.getItem('token') != null)
      this.router.navigateByUrl('/home');
  }

  onSubmit() {
    this.service.login(this.formModel.UserName, this.formModel.Password).subscribe(
      (res: any) => {
        localStorage.setItem('token', res.token);
        this.router.navigateByUrl('/home');
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
