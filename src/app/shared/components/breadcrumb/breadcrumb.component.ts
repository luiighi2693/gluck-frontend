import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit, AfterViewInit {
  currentRoute: any;
  @Input() currentView: string;
  baseRoute: string;
  accountType: any;
  @Input() icon: any;


  constructor(
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    // if (this.currentView.length > 10) {
    //   this.currentView.slice(11);
    // }
    if (JSON.parse(sessionStorage.getItem('isAdmin')) === true) {
      this.accountType = 'Admin';
    } else {
      this.accountType = 'User';
    }
    if (this.router.url.includes('home')) {
      this.baseRoute = '/home';
      this.currentRoute = this.router.url.slice(5);
    } else if (this.router.url.includes('admin')) {
      this.baseRoute = '/admin';
    }
    console.log(this.currentRoute);
    console.log(this.baseRoute);
    console.log(this.accountType);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      if (this.currentView.length > 30) {
        this.currentView = this.currentView.substring(0, 30).concat('...');
      }
    }, 1000);
  }

}
