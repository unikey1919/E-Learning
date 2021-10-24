import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/Services/user.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [],
})
export class RegisterComponent implements OnInit {
  constructor(public service: UserService, private fb: FormBuilder) {}

  //Log error message
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  formModel = this.fb.group({
    UserName: ['', Validators.required],
    Email: ['', Validators.email],
    FullName: [''],
    Passwords: this.fb.group({
      Password: ['', [Validators.required, Validators.minLength(4)]],
      ConfirmPassword: ['', Validators.required]
    }, { validator: this.comparePassword })
  });

  comparePassword(fb: FormGroup){
    let confirmPasswordCtrl = fb.get('ConfirmPassword');
    if (confirmPasswordCtrl!.errors == null || 'passwordMismatch' in confirmPasswordCtrl!.errors) {
      if (fb.get('Password')!.value != confirmPasswordCtrl!.value)
      confirmPasswordCtrl!.setErrors({ passwordMismatch: true });
      else
      confirmPasswordCtrl!.setErrors(null);
    }
  }
  ngOnInit(): void {}

  onSubmit(): void {
    let userName = this.formModel.value.UserName;
    let passWord = this.formModel.value.Passwords.Password;
    let email = this.formModel.value.Email;
    let fullName = this.formModel.value.FullName;

    this.service.register(userName, email, passWord, fullName).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }
}
