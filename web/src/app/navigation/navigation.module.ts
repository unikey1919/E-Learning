import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from '../user/user.component';
import { RouterModule } from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    NgChartsModule
  ]
})
export class NavigationModule { }
