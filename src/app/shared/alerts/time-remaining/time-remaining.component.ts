import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-time-remaining',
  templateUrl: './time-remaining.component.html',
  styleUrls: ['./time-remaining.component.css']
})
export class TimeRemainingComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<TimeRemainingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      time: any,
    }) {
  }

  ngOnInit(): void {
  }

  onDismiss() {
    this.dialogRef.close();
  }
}
