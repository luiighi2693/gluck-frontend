import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { Router } from '@angular/router';
import {HandleAlertsProvider} from '../../../utilities/providers/handle-alerts-provider';

@Component({
  selector: 'app-register-pool-dialog',
  templateUrl: './register-pool-dialog.component.html',
  styleUrls: ['./register-pool-dialog.component.css']
})
export class RegisterPoolDialogComponent implements OnInit {

  constructor(
    private router: Router,
    private handleAlertsProvider: HandleAlertsProvider,
    public dialogRef: MatDialogRef<RegisterPoolDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      poolId: string | number,
      title: string,
      user: string,
      cost: any,
      coins: any,
      prize: string,
      image: string,
      participants: string,
      rulesImage: string,
      password: any;
    }) {
  }

  ngOnInit(): void {
    console.log(this.data);
  }

  onDismiss() {
    this.dialogRef.close();
  }

  register(id) {
    this.router.navigate([`/pools/register-to-pool/${id}`]);
  }

  ShowRules(rules: string) {
    this.handleAlertsProvider.presentRulesDialog(rules);
  }

  sendPassword() {
    if (this.data.password === null || this.data.password === '' || this.data.password === undefined) {
      return this.data.password = null;
    } else {
      return this.data.password;
    }
  }
}
