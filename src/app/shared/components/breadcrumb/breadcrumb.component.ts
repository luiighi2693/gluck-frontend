import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Location} from '@angular/common';

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
  isMobile = false;


  constructor(
    private router: Router,
    private location: Location
  ) {
  }

  ngOnInit(): void {
    if (window.innerWidth < 992) {
      this.isMobile = true;
    }
    if (JSON.parse(sessionStorage.getItem('isAdmin')) === true) {
      this.accountType = 'Admin';
    } else {
      this.accountType = 'User';
    }
    if (this.router.url.includes('home')) {
      this.baseRoute = 'home';
      this.currentRoute = this.router.url.slice(5).split('/').join(' > ');
    } else if (this.router.url.includes('admin')) {
      this.baseRoute = 'admin';
      this.currentRoute = this.router.url.slice(6).split('/').join(' > ');
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

  goBack() {
    this.location.back();
  }
}
