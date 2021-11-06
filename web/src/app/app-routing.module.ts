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

  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'forbidden', component: ForbiddenComponent },

  {
    path: 'admin',
    component: AdminPanelComponent,
    canActivate: [AuthGuard],
    data: { permittedRoles: ['Admin'] },
    children: [
      { path: 'course', component: CourseComponent },
      { path: 'enrollment', component: EnrollmentComponent },
      { path: 'test', component: TestComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
