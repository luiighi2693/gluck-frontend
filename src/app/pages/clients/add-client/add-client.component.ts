import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';


@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
  currentRoute: string;
  hide = false;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

}
