import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-ok-confirmation-alert',
  templateUrl: './ok-confirmation-alert.component.html',
  styleUrls: ['./ok-confirmation-alert.component.css']
})
export class OkConfirmationAlertComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<OkConfirmationAlertComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { title: string, message: string}) {}

  ngOnInit(): void {
  }

  onDismiss() {
    this.dialogRef.close();
  }
}
