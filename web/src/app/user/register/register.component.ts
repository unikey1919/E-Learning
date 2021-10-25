import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/Services/user.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [],
})
export class RegisterComponent implements OnInit {
  constructor(public service: UserService, private fb: FormBuilder, private toastr: ToastrService) {}

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
      (res: any) => {
        if (res.succeeded) {
          this.formModel.reset();
          this.toastr.success('New user created!', 'Registration successful.');
        } else {
          res.errors.forEach((element: { code: any; description: string | undefined; }) => {
            switch (element.code) {
              case 'DuplicateUserName':
                this.toastr.error('Username is already taken','Registration failed.');
                break;

              default:
              this.toastr.error(element.description,'Registration failed.');
                break;
            }
          });
        }
      },
      err => {
        console.log(err);
      }
    );
  }
}
