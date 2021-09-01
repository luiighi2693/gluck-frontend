import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  currentRoute: string;
  isAdmin: string;

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.currentRoute = this.router.url;

  }

  goToLegalAgreement() {
    if (sessionStorage.getItem('isAdmin')) {
      this.router.navigate(['/admin/legal-agreement']);
    } else {
      this.router.navigate(['/home/legal-agreement']);
    }
  }
}
