import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-participants',
  templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.css']
})
export class ParticipantsComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ParticipantsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      participants: any
      // listOfParticipants
    }) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  // getParticipants(participants) {
  //
  // }

}
