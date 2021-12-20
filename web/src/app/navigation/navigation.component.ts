import { Component, NgModule } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ChartType, ChartOptions } from 'chart.js';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})



export class NavigationComponent {
  events: string[] = [];
  opened: boolean;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  string: string='thiện đại ca'
  
 
  constructor(private breakpointObserver: BreakpointObserver,private router: Router) {}
  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/user/login']);
  }

  // events
  // public chartClicked(e:any):void {
  //   console.log(e);
  // }
 
  // public chartHovered(e:any):void {
  //   console.log(e);
  // }
  
}
