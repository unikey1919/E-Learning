import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/shared/Services/user.service';
import { SocialUser } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import { SocialAuthService  } from 'angularx-social-login';
import { UserProfileService } from 'src/app/shared/Services/user-profile.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: []
})
export class LoginComponent implements OnInit {
  user: SocialUser | null;
  img: any;
  formModel = {
    UserName: '',
    Password: ''
  };
  username: any;

  constructor(
    private service: UserService, private router: Router, private toastr:ToastrService,
    private authService: SocialAuthService, private userProfileService:UserProfileService ){ 
      this.user = null;
	    this.authService.authState.subscribe((user: SocialUser) => {
	    console.log(user);
	    this.user = user;
	  });
    }
    
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
    this.service.login(this.formModel.UserName, this.formModel.Password, "").subscribe(
      (res: any) => {
        localStorage.setItem('token', res.token);
        var payLoad = JSON.parse(window.atob(localStorage.getItem('token')!.split('.')[1]));
        var userRole = payLoad.role;
        localStorage.setItem('userRole', payLoad.role);
        this.onGetUserProfile();
        if (userRole == 'Student' || userRole == 'Instructor'){
          this.router.navigateByUrl('/e-learning/home');
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

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((x: any) => {
      this.img = this.user?.photoUrl;
      localStorage.setItem('google_auth',JSON.stringify(x));
      localStorage.setItem('img', this.img);
      this.service.login('', '', this.user?.email).subscribe(
        (res: any) => {
          localStorage.setItem('token', res.token);
          var payLoad = JSON.parse(window.atob(localStorage.getItem('token')!.split('.')[1]));
          var userRole = payLoad.role;
          localStorage.setItem('userRole', payLoad.role);
          this.onGetUserProfile();
          if (userRole == 'Student' || userRole == 'Instructor'){
            this.router.navigateByUrl('/e-learning/home');
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
    });  
  }

  signOut(): void {
    this.authService.signOut();
  }
  
  onGetUserProfile(){
    this.userProfileService.getUserProfile().subscribe(
      res => {
        localStorage.setItem('username', res.userName);
        localStorage.setItem('email', res.email);
      },
      err => {
        console.log(err);
      },
    ); 
  }

}
