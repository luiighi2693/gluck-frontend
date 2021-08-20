import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-battle-table',
  templateUrl: './battle-table.component.html',
  styleUrls: ['./battle-table.component.css']
})
export class BattleTableComponent implements OnInit {
  @Input() round: any;
  @Input() category: any;
  @ViewChild('openModalShowRival') private openModalShowRival: ElementRef;
  @ViewChild('modalShowRival') private modalShowRival;

  rivalToShow: any;
  closeResult = '';

  constructor(private modalService: NgbModal) {
  }

  static getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  ngOnInit(): void {
  }


  showRivalDetails($event) {
    console.log(this.category);

    this.rivalToShow = $event;
    this.openModalShowRival.nativeElement.click();
  }


  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', centered: true}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${BattleTableComponent.getDismissReason(reason)}`;
    });
  }

}
