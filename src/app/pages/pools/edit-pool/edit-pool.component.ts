import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {HandleAlertsProvider} from '../../../utilities/providers/handle-alerts-provider';
import {Router} from '@angular/router';
import {AdminService} from '../../../services/admin.service';

export interface UserData {
  rowid: string;
  username: string;
  name: string;
  email: string;
  phone: string;
  status: number;
  date_Access: string;
}


@Component({
  selector: 'app-edit-pool',
  templateUrl: './edit-pool.component.html',
  styleUrls: ['./edit-pool.component.css']
})
export class EditPoolComponent implements OnInit, AfterViewInit {
  config: FormGroup;
  users: FormGroup;
  matches: FormGroup;
  results: FormGroup;
  showLoader = false;
  amountOfMatches: number;
  doPenaltiesExist = '';
  arrayOfMatches = [];
  limitOfUsers: any;

  displayedColumns: string[] = ['rowid', 'username', 'name', 'email', 'phone', 'status', 'date_Access', 'opts'];
  dataSource: MatTableDataSource<UserData>;
  selection = new SelectionModel<UserData>(true, []);


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private handleAlertsProvider: HandleAlertsProvider,
    private router: Router,
    private admin: AdminService,
    private fb: FormBuilder,
  ) {
    this.admin.initToken();
  }
  ngOnInit(): void {
    this.createForms();
  }

  ngAfterViewInit() {
    this.setData();
    this.updateForms();
  }

  setData() {
    this.showLoader = true;
    this.admin.getUsers().subscribe(data => {
      if (data.code === 'D200') {
        this.showLoader = false;
        this.dataSource = new MatTableDataSource<UserData>(data.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      } else if (data.code === 'A401' || data.code === 'A302' || data.code === 'A403') {
        this.handleAlertsProvider.presentGenericAlert('Por favor inicie sesion de nuevo...', 'Su Sesion Expiro!');
        this.router.navigate(['/auth']);
      }
    }, error => {
      this.showLoader = false;
      this.handleAlertsProvider.presentGenericAlert(error);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // /** Whether the number of selected elements matches the total number of rows. */
  // isAllSelected() {
  //   const numSelected = this.selection.selected.length;
  //   const numRows = this.dataSource.data.length;
  //   return numSelected === numRows;
  // }
  //
  // /** Selects all rows if they are not all selected; otherwise clear selection. */
  // masterToggle() {
  //   this.isAllSelected() ?
  //     this.selection.clear() :
  //     this.dataSource.data.forEach(row => this.selection.select(row));
  // }


  private createForms() {
    this.config = this.fb.group({
      name: ['', Validators.required],
      sport: ['', Validators.required],
      color: ['', Validators.required],
      matches: ['', Validators.required],
      usersLimit: ['', Validators.required],
      status: ['', Validators.required],
      penalty: ['', Validators.required],
      groups: ['', Validators.required],
      teamsPerGroup: ['', Validators.required],
      type: ['', Validators.required],
      league: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.results = this.fb.group({
      result: ['', Validators.required],
      winner: ['', Validators.required],
      draw: ['', Validators.required],
      loser: ['', Validators.required]
    });
  }

  updateForms() {
    this.config.get('name').setValue(null);
  }

  show() {
    console.log(this.config.value.color.hex);
  }

  makeMatches() {
    this.arrayOfMatches = [];
    this.limitOfUsers = Number(this.config.value.usersLimit);
    this.doPenaltiesExist = this.config.value.penalty;
    for (let i = 0; i < this.amountOfMatches; i++) {
      this.arrayOfMatches.push({
        team1: '',
        penalty1: '',
        team2: '',
        penalty2: '',
        date: '',
        time: '',
        status: '',
        result: '',
      });
    }
    console.log(this.arrayOfMatches);
    console.log(this.limitOfUsers);
  }

  showSelection(stepper) {
    if (!this.selection.hasValue()) {
      this.handleAlertsProvider.presentSnackbarError('Selecciona los usuarios participantes!');
    }else if (this.selection.selected.length > this.limitOfUsers) {
      this.handleAlertsProvider.presentGenericAlert(`Has superado el limite de participantes en esta quiniela, el limite es <b>${this.limitOfUsers}</b>`, 'Aviso!');
    } else {
      stepper.next();
    }
    console.log(this.selection.selected.length);
  }

  resetForm(stepper) {
    const dialogRef = this.handleAlertsProvider.presentErrorDialogOk(
      'se eliminaran todos los cambios que ha realizado hasta el momento.',
      'Esta seguro de cancelar el registro?');
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        stepper.reset();
      }
    })
  }

  registerPool() {
    const { name, sport, color, matches, usersLimit, status, penalty, groups, teamsPerGroup, type, league, password } = this.config.value;
    const matchesInfo = this.arrayOfMatches;
    const usersForPool = this.selection.selected;
    const { result, winner, draw, loser } = this.results.value;
    console.log({
      name,
      sport,
      color: color.hex.includes('#') ? color.hex : `#${color.hex}`,
      matches,
      usersLimit,
      status,
      penalty,
      groups,
      teamsPerGroup,
      type,
      league,
      password,
      matchesInfo,
      usersForPool,
      result,
      winner,
      draw,
      loser
    });
  }
}
