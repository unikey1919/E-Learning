import { ForumComponent } from './e-learning/forum/forum.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { RegisterComponent } from './user/register/register.component';
import { LoginComponent } from './user/login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { CourseComponent } from './admin-panel/course/course.component';
import { EnrollmentComponent } from './admin-panel/enrollment/enrollment.component';
import { TestComponent } from './admin-panel/course/test/test.component';
import { InstructorComponent } from './admin-panel/instructor/instructor.component';
import { StudentComponent } from './admin-panel/student/student.component';
import { ContentComponent } from './e-learning/content/content.component';
import { AssignmentComponent } from './e-learning/assignment/assignment.component';
import { ELearningComponent } from './e-learning/e-learning.component';
import { QuizComponent } from './e-learning/quiz/quiz.component';
import { ThongkeComponent } from './admin-panel/thongke/thongke.component';
import { GiaovienthongkeComponent } from './e-learning/giaovienthongke/giaovienthongke.component';

const routes: Routes = [
  { path: '', redirectTo: 'user/login', pathMatch: 'full' },

  {
    path: 'user',
    component: UserComponent,
    children: [
      { path: 'registration', component: RegisterComponent },
      { path: 'login', component: LoginComponent },
    ],
  },

  {
    path: 'e-learning',
    component: ELearningComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'content',
          breadcrumb: [
            {
              label: 'Home',
              url: '/e-learning/home',
            }
          ],
        },
      },

      {
        path: 'course/content/:id',
        component: ContentComponent,
        data: {
          title: 'content',
          breadcrumb: [
            {
              label: 'Home',
              url: '/e-learning/home',
            },
            {
              label: 'Content',
              url: '/e-learning/course/content',
            },
          ],
        },
      },

      {
        path: 'course/assignment/:id/:subjectId/:courseId', component: AssignmentComponent,
        data: {
          title: 'content',
          breadcrumb: [
            {
              label: 'Home',
              url: '/e-learning/home'
            },
            {
              label: 'Subject',
              url: '/e-learning/course/content/:courseId'
            },
            {
              label: 'Assignment',
              url: '/e-learning/course/assignment'
            },
          ]
        },
      },
      {
        path: 'course/quiz/:id/:subjectId/:courseId', component: QuizComponent,
        data: {
          title: 'content',
          breadcrumb: [
            {
              label: 'Home',
              url: '/e-learning/home'
            },
            {
              label: 'Subject',
              url: '/e-learning/course/content/:courseId'
            },
            {
              label: 'Quiz',
              url: '/e-learning/course/quiz'
            },
          ]
        },
      },

      {
        path: 'course/statistic/:courseId', component: GiaovienthongkeComponent,
        data: {
          title: 'content',
          breadcrumb: [
            {
              label: 'Home',
              url: '/e-learning/home'
            },
            {
              label: 'Subject',
              url: '/e-learning/course/content/:courseId'
            },
            {
              label: 'Thống kê',
              url: '/e-learning/course/quiz'
            },
          ]
        },
      },

      {
        path: 'course/forum/:id/:subjectId/:courseId', component: ForumComponent,
        data: {
          title: 'content',
          breadcrumb: [
            {
              label: 'Home',
              url: '/e-learning/home'
            },
            {
              label: 'Subject',
              url: '/e-learning/course/content/:courseId'
            },
            {
              label: 'Forum',
              url: '/e-learning/course/forum'
            },
          ]
        },
      },
    ],
  },

  { path: 'forbidden', component: ForbiddenComponent },
  {
    path: 'admin',
    component: AdminPanelComponent,
    canActivate: [AuthGuard],
    data: { permittedRoles: ['Admin'] },
    children: [
      { path: 'course', component: CourseComponent },
      { path: 'enrollment', component: EnrollmentComponent },
      { path: 'course/test', component: TestComponent },
      { path: 'instructor', component: InstructorComponent },
      { path: 'student', component: StudentComponent },
      { path: 'statistic', component: ThongkeComponent }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
