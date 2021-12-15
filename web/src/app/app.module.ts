import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ELearningComponent } from './e-learning/e-learning.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserComponent } from './user/user.component';
import { RegisterComponent } from './user/register/register.component';
import { ReactiveFormsModule} from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from './user/login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { UserProfileService } from './shared/Services/user-profile.service';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { NavigationComponent } from './navigation/navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { CourseComponent } from './admin-panel/course/course.component';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import {TableModule} from 'primeng/table';
import {DropdownModule} from 'primeng/dropdown';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {ToastModule} from 'primeng/toast';
import { EnrollmentComponent } from './admin-panel/enrollment/enrollment.component';
import { TestComponent } from './admin-panel/course/test/test.component';
import {InstructorComponent} from './admin-panel/instructor/instructor.component';
import { ModalModule } from 'ngx-bootstrap/modal'; 
import {MatCheckboxModule} from '@angular/material/checkbox';
import { StudentComponent } from './admin-panel/student/student.component';
import { ContentComponent } from './e-learning/content/content.component';
import { AssignmentComponent } from './e-learning/assignment/assignment.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NgxDropzoneModule } from 'ngx-dropzone';
import {NgDynamicBreadcrumbModule} from 'ng-dynamic-breadcrumb';
import { ForumComponent } from './e-learning/forum/forum.component';
import {YouTubePlayerModule} from '@angular/youtube-player';
import { ChatComponent } from './e-learning/chat/chat.component';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { DiscussionComponent } from './e-learning/chat/discussion/discussion.component';
@NgModule({
  declarations: [
    AppComponent,
    ELearningComponent,
    UserComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    AdminPanelComponent,
    ForbiddenComponent,
    NavigationComponent,
    CourseComponent,
    EnrollmentComponent,
    TestComponent,
    InstructorComponent,
    StudentComponent,
    ContentComponent,
    AssignmentComponent,
    ForumComponent,
    ChatComponent,
    DiscussionComponent,
  ],
  imports: [
    MatCheckboxModule,
    ModalModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatDialogModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      progressBar: true
    }),
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    TableModule,
    DropdownModule,
    MessagesModule,
    MessageModule,
    ToastModule,
    CKEditorModule,
    NgxDropzoneModule,
    NgDynamicBreadcrumbModule,
    YouTubePlayerModule,
    PickerModule
  ],
  providers: [UserProfileService,{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
