import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {HandleAlertsProvider} from '../../../utilities/providers/handle-alerts-provider';

@Component({
  selector: 'app-generated-url',
  templateUrl: './generated-url.component.html',
  styleUrls: ['./generated-url.component.css']
})
export class GeneratedUrlComponent implements OnInit {
  isCopied = false;

  constructor(
    private handleAlertsProvider: HandleAlertsProvider,
    public dialogRef: MatDialogRef<GeneratedUrlComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { url: string }) {}

  ngOnInit(): void {
  }

  onDismiss() {
    this.dialogRef.close();
  }

  copyToClipboard() {
    window.navigator.clipboard.writeText(this.data.url);
    this.isCopied = true;
    this.handleAlertsProvider.presentSnackbarSuccess('Se copio la URL en el porta papeles!');
  }
}
