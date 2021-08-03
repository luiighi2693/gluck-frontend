import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {HandleAlertsProvider} from '../../../utilities/providers/handle-alerts-provider';
import {ActivatedRoute, Router} from '@angular/router';
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
  doPenaltiesExist: number;
  arrayOfMatches = [];
  limitOfUsers: any;
  currentPool: string;
  poolData: any;
  sports: any;
  teams: any;
  hide = true;

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
    private route: ActivatedRoute,
  ) {
    this.admin.initToken();
  }

  ngOnInit(): void {
    this.getCurrentPool();
    this.createForms();
  }

  ngAfterViewInit() {
    this.setData();
  }

  getCurrentPool() {
    this.route.params.subscribe(params => {
      this.currentPool = params.id;
    });
  }

  setData() {
    this.getUsers();
    this.getPool();
    this.setSportsData();
    this.setTeamsData();
  }

  getUsers() {
    this.showLoader = true;
    this.admin.getUsers().subscribe(data => {
      this.showLoader = false;
      if (data.code === 'D200') {
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

  setTeamsData() {
    this.showLoader = true;
    this.admin.getTeams().subscribe(data => {
      if (data.code === 'D200') {
        this.showLoader = false;
        this.teams = data.data;
      } else if (data.code === 'A401' || data.code === 'A302' || data.code === 'A403') {
        this.handleAlertsProvider.presentGenericAlert('Por favor inicie sesion de nuevo...', 'Su Sesion Expiro!');
        this.router.navigate(['/auth']);
      }
    }, error => {
      this.showLoader = false;
      this.handleAlertsProvider.presentGenericAlert(error);
    });
  }

  setSportsData() {
    this.showLoader = true;
    this.admin.getSports().subscribe(data => {
      if (data.code === 'D200') {
        this.showLoader = false;
        this.sports = data.data;
      } else if (data.code === 'A401' || data.code === 'A302' || data.code === 'A403') {
        this.handleAlertsProvider.presentGenericAlert('Por favor inicie sesion de nuevo...', 'Su Sesion Expiro!');
        this.router.navigate(['/auth']);
      }
    }, error => {
      this.showLoader = false;
      this.handleAlertsProvider.presentGenericAlert(error);
    });
  }


  getPool() {
    this.showLoader = true;
    this.admin.getPoolForEdit(this.currentPool).subscribe(data => {
      this.showLoader = false;
      if (data.code === 'D200') {
        console.log(data);
        this.selection = new SelectionModel<UserData>(true, data.data.usersForPool);
        this.poolData = data.data;
        this.updateForms();
        this.makeMatches();
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
      usersLimit: [''],
      status: ['', Validators.required],
      penalty: ['', Validators.required],
      groups: [''],
      teamsPerGroup: [''],
      type: [''],
      league: [''],
      password: [''],
    });
    this.results = this.fb.group({
      result: ['', Validators.required],
      winner: ['', Validators.required],
      draw: ['', Validators.required],
      loser: ['', Validators.required]
    });
  }

  updateForms() {
    this.config.get('name').setValue(this.poolData.name);
    this.config.get('sport').setValue(this.poolData.sport);
    this.config.get('color').setValue(this.poolData.color);
    this.config.get('matches').setValue(this.poolData.matches);
    this.config.get('usersLimit').setValue(this.poolData.usersLimit);
    this.config.get('status').setValue(this.poolData.status);
    this.config.get('penalty').setValue(this.poolData.penalty);
    this.config.get('groups').setValue(this.poolData.groups);
    this.config.get('teamsPerGroup').setValue(this.poolData.teamsPerGroup);
    this.config.get('type').setValue(this.poolData.type);
    this.config.get('league').setValue(this.poolData.league);
    this.config.get('password').setValue(this.poolData.password);

    this.results.get('winner').setValue(this.poolData.winner);
    this.results.get('loser').setValue(this.poolData.loser);
    this.results.get('draw').setValue(this.poolData.draw);
    this.results.get('result').setValue(this.poolData.result);
  }

  show() {
    console.log(this.config.value.color.hex);
  }

  makeMatches() {
    this.poolData.matchesInfo.forEach(match => {
      match.time = match.time.split(':')[0] + ':' + match.time.split(':')[1] + ' ' + (Number(match.time.split(':')[0]) > 11 ? 'pm' : 'am');
    });
    this.arrayOfMatches = this.poolData.matchesInfo;
  }

  // showSelection(stepper) {
  //   if (!this.selection.hasValue()) {
  //     this.handleAlertsProvider.presentSnackbarError('Selecciona los usuarios participantes!');
  //   } else if (this.selection.selected.length > this.limitOfUsers) {
  //     this.handleAlertsProvider.presentGenericAlert(`Has superado el limite de participantes en esta quiniela, el limite es <b>${this.limitOfUsers}</b>`, 'Aviso!');
  //   } else {
  //     stepper.next();
  //   }
  //   console.log(this.selection.selected.length);
  // }

  resetForm(stepper) {
    const dialogRef = this.handleAlertsProvider.presentErrorDialogOk(
      'se eliminaran todos los cambios que ha realizado hasta el momento.',
      'Esta seguro de cancelar el registro?');
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        stepper.reset();
      }
    });
  }

  registerPool() {
    this.showLoader = true;
    const {name, sport, color, matches, usersLimit, status, penalty, groups, teamsPerGroup, type, league, password} = this.config.value;
    const matchesInfo = this.arrayOfMatches;
    const usersForPool = this.selection.selected;
    const {result, winner, draw, loser} = this.results.value;
    // const colorValue = color.hex.includes('#') ? color.hex : `#${color.hex}`;
    console.log({
      name,
      sport,
      color,
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
    this.admin.createAndUpdatePool(
      name,
      sport,
      color,
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
      loser,
      'update',
      '',
      this.currentPool).subscribe(data => {
      this.showLoader = false;
      if (data.code === 'D200') {
        this.handleAlertsProvider.presentSnackbarSuccess('Se Actualizo la quiniela con exito!');
        this.router.navigate(['admin/pools/list-of-pools']);
      } else if (data.code === 'A401' || data.code === 'A302' || data.code === 'A403') {
        this.handleAlertsProvider.presentGenericAlert('Por favor inicie sesion de nuevo...', 'Su Sesion Expiro!');
        this.router.navigate(['/auth']);
      }
    }, error => {
      this.showLoader = false;
      this.handleAlertsProvider.presentGenericAlert(error);
    });
  }
}
