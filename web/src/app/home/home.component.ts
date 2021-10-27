import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../shared/Models/user.model';
import { UserProfileService } from '../shared/Services/user-profile.service';
import { UserService } from '../shared/Services/user.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit {
  userDetails;

  formData: User = new User();
  constructor(private router: Router, private userProfileService: UserProfileService) { }

  ngOnInit(): void {
    this.userProfileService.getUserProfile().subscribe(
      res => {
        this.formData.userName = res.userName;
        this.formData.fullName = res.fullName;
        this.formData.email = res.email;
      },
      err => {
        console.log(err);
      },
    );
  }

  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/user/login']);
  }

}
