import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from '../user/user.component';
import { RouterModule } from '@angular/router';
import { TestComponent } from '../test/test.component';
import {MatSidenavModule} from '@angular/material/sidenav';

@NgModule({
  declarations: [
    TestComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule
  ]
})
export class NavigationModule { }
