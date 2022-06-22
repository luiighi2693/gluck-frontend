import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { Router } from '@angular/router';
import {HandleAlertsProvider} from '../../../utilities/providers/handle-alerts-provider';

@Component({
  selector: 'app-rules-dialog',
  templateUrl: './rules-dialog.component.html',
  styleUrls: ['./rules-dialog.component.css']
})
export class RulesDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<RulesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      rulesImage: string
    }) {
  }

  ngOnInit(): void {
  }

  onDismiss() {
    this.dialogRef.close();
  }
}
