import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatAccordion} from '@angular/material/expansion';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {HandleAlertsProvider} from '../../../utilities/providers/handle-alerts-provider';
import {Router} from '@angular/router';
import {AdminService} from '../../../services/admin.service';


export interface PeriodicElement {
  name: string;
  id: string;
  dollarPrice: string;
  gCoinPrice: string;
  prize: string;
  participants: string;
  remainingTime: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    id: '1',
    name: 'Hola como estas bien y tu?',
    dollarPrice: '$5',
    gCoinPrice: '(G) 5',
    prize: '$400',
    participants: '30/200',
    remainingTime: '2:00:54'
  },
  {
    id: '2',
    name: 'Hola como estas bien y tu?',
    dollarPrice: '$5',
    gCoinPrice: '(G) 5',
    prize: '$400',
    participants: '30/200',
    remainingTime: '2:00:54'
  },
  {
    id: '3',
    name: 'Hola como estas bien y tu?',
    dollarPrice: '$5',
    gCoinPrice: '(G) 5',
    prize: '$400',
    participants: '30/200',
    remainingTime: '2:00:54'
  },
  {
    id: '4',
    name: 'Hola como estas bien y tu?',
    dollarPrice: '$5',
    gCoinPrice: '(G) 5',
    prize: '$400',
    participants: '30/200',
    remainingTime: '2:00:54'
  },
  {
    id: '5',
    name: 'Hola como estas bien y tu?',
    dollarPrice: '$5',
    gCoinPrice: '(G) 5',
    prize: '$400',
    participants: '30/200',
    remainingTime: '2:00:54'
  },
  {
    id: '6',
    name: 'Hola como estas bien y tu?',
    dollarPrice: '$5',
    gCoinPrice: '(G) 5',
    prize: '$400',
    participants: '30/200',
    remainingTime: '2:00:54'
  },
  {
    id: '7',
    name: 'Hola como estas bien y tu?',
    dollarPrice: '$5',
    gCoinPrice: '(G) 5',
    prize: '$400',
    participants: '30/200',
    remainingTime: '2:00:54'
  },
  {
    id: '8',
    name: 'Hola como estas bien y tu?',
    dollarPrice: '$5',
    gCoinPrice: '(G) 5',
    prize: '$400',
    participants: '30/200',
    remainingTime: '2:00:54'
  },
  {
    id: '9',
    name: 'Hola como estas bien y tu?',
    dollarPrice: '$5',
    gCoinPrice: '(G) 5',
    prize: '$400',
    participants: '30/200',
    remainingTime: '2:00:54'
  },
  {
    id: '10',
    name: 'Hola como estas bien y tu?',
    dollarPrice: '$5',
    gCoinPrice: '(G) 5',
    prize: '$400',
    participants: '30/200',
    remainingTime: '2:00:54'
  },
];

@Component({
  selector: 'app-my-pools',
  templateUrl: './my-pools.component.html',
  styleUrls: ['./my-pools.component.css']
})
export class MyPoolsComponent implements OnInit, AfterViewInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;

  displayedColumns: string[] = ['id', 'name', 'dollarPrice', 'gCoinPrice', 'prize', 'participants', 'remainingTime', 'opts'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  showLoader = false;
  user: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private handleAlertsProvider: HandleAlertsProvider,
    private router: Router,
    private admin: AdminService,
  ) {
    this.admin.initToken();
  }

  ngOnInit(): void {
    this.user = sessionStorage.getItem('username');
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    // this.setData();
  }

  // setData() {
  //   this.showLoader = true;
  //   this.admin.getUsers().subscribe(data => {
  //     if (data.code === 'D200') {
  //       this.showLoader = false;
  //       this.dataSource = new MatTableDataSource<UserData>(data.data);
  //       this.dataSource.paginator = this.paginator;
  //       this.dataSource.sort = this.sort;
  //     } else if (data.code === 'A401' || data.code === 'A302' || data.code === 'A403') {
  //       this.handleAlertsProvider.presentGenericAlert('Por favor inicie sesion de nuevo...', 'Su Sesion Expiro!');
  //       this.router.navigate(['/auth']);
  //     }
  //   }, error => {
  //     this.showLoader = false;
  //     this.handleAlertsProvider.presentGenericAlert(error);
  //   });
  // }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editUser(id) {
    this.router.navigate([`/admin/clients/edit-client/${id}`]);
  }

  // deleteUser(user) {
  //   const dialogRef = this.handleAlertsProvider.presentErrorDialogOk(`Esta seguro de eliminar el usuario <b>${user.name}</b>?`, 'Aviso!');
  //   dialogRef.afterClosed().subscribe(response => {
  //     if (response) {
  //       this.showLoader = true;
  //       this.admin.deleteUser(user.rowid).subscribe(res => {
  //         this.showLoader = false;
  //         if (res.code === 'D200') {
  //           this.handleAlertsProvider.presentSnackbarSuccess(`Se ha eliminado el user ${user.name} con exito!`);
  //           this.setData();
  //         } else if (res.code === 'A401' || res.code === 'A302' || res.code === 'A403') {
  //           this.handleAlertsProvider.presentGenericAlert('Por favor inicie sesion de nuevo...', 'Su Sesion Expiro!');
  //           this.router.navigate(['/auth']);
  //         }
  //       }, err => {
  //         this.handleAlertsProvider.presentGenericAlert(err);
  //       });
  //     }
  //   }, error => {
  //     this.handleAlertsProvider.presentGenericAlert(error);
  //   });
  // }

  showRemainingTime(id) {
    alert(id);

  }

  showParticipants(id) {
    alert(id);
  }

  enterPool(id) {
    alert(id);
  }

  goToRegister(data) {
    alert(data);
  }

  registerToPool(id) {
    this.router.navigate([`/home/pools/pools-results/${id}`]);
  }
}
