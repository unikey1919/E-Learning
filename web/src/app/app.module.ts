import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ELearningComponent } from './e-learning/e-learning.component';
import { ELearningFormComponent } from './e-learning/e-learning-form/e-learning-form.component';
import { HttpClientModule } from '@angular/common/http';
import { UserComponent } from './user/user.component';
import { RegisterComponent } from './user/register/register.component';
import { ReactiveFormsModule} from '@angular/forms'
import { UserService } from './shared/Services/user.service';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    ELearningComponent,
    ELearningFormComponent,
    UserComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      progressBar: true
    })
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
