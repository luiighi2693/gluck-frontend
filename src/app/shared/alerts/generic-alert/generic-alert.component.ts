import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-generic-alert',
  templateUrl: './generic-alert.component.html',
  styleUrls: ['./generic-alert.component.css']
})
export class GenericAlertComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<GenericAlertComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { title: string, message: string }) {}G

  ngOnInit(): void {
  }

  onDismiss() {
    this.dialogRef.close();
  }

}
