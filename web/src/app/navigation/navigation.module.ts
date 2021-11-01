import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from '../user/user.component';
import { RouterModule } from '@angular/router';
import { TestComponent } from '../test/test.component';



@NgModule({
  declarations: [
    TestComponent,
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class NavigationModule { }
