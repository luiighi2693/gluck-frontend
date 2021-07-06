import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  isLoaded = false;

  constructor(private router: Router  ) {
  }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.isLoaded = true;
      } else if (event instanceof NavigationEnd) {
        this.isLoaded = false;
      }
    }, error => {
      this.isLoaded = false;
      console.error(error);
    });
  }
}
