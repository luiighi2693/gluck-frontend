import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {HandleAlertsProvider} from '../../../utilities/providers/handle-alerts-provider';
import {ActivatedRoute, Router} from '@angular/router';
import {AdminService} from '../../../services/admin.service';
import {environment} from '../../../../environments/environment';
import {LoaderProvider} from '../../../utilities/providers/loader-provider';
import * as moment from 'moment';


export interface UserData {
  rowid: string;
  username: string;
  name: string;
  email: string;
  amount: string;
  status: number;
  coins: string;
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
  endPools: FormGroup;
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

  displayedColumns: string[] = ['rowid', 'username', 'name', 'email', 'amount', 'coins', 'status', 'opts'];
  dataSource: MatTableDataSource<UserData>;
  selection = new SelectionModel<UserData>(true, []);


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  imagePath;

  @ViewChild('inputFiles', {static: true}) inputFiles: ElementRef;

  awardType;
  usersData = [];
  usersForPool = [];

  constructor(
    private handleAlertsProvider: HandleAlertsProvider,
    private router: Router,
    private admin: AdminService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private loaderValue: LoaderProvider,
  ) {
    this.admin.initToken();
    this.imagePath = environment.basePath;
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
    this.loaderValue.updateIsloading(true);
    this.admin.getUsers().subscribe(data => {
      this.loaderValue.updateIsloading(false);
      if (data.code === 'D200') {
        this.usersData = data.data;
        this.dataSource = new MatTableDataSource<UserData>(data.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      } else if (data.code === 'A401' || data.code === 'A302' || data.code === 'A403') {
        this.handleAlertsProvider.presentGenericAlert('Por favor inicie sesion de nuevo...', 'Su Sesion Expiro!');
        this.router.navigate(['/auth']);
      }
    }, error => {
      this.handleAlertsProvider.presentGenericAlert(error);
    });
  }

  setTeamsData() {
    this.loaderValue.updateIsloading(true);
    this.admin.getTeams().subscribe(data => {
      this.loaderValue.updateIsloading(false);
      if (data.code === 'D200') {
        this.teams = data.data;
      } else if (data.code === 'A401' || data.code === 'A302' || data.code === 'A403') {
        this.handleAlertsProvider.presentGenericAlert('Por favor inicie sesion de nuevo...', 'Su Sesion Expiro!');
        this.router.navigate(['/auth']);
      }
    }, error => {
      this.handleAlertsProvider.presentGenericAlert(error);
    });
  }

  setSportsData() {
    this.loaderValue.updateIsloading(true);
    this.admin.getSports().subscribe(data => {
      this.loaderValue.updateIsloading(false);
      if (data.code === 'D200') {
        this.sports = data.data;
      } else if (data.code === 'A401' || data.code === 'A302' || data.code === 'A403') {
        this.handleAlertsProvider.presentGenericAlert('Por favor inicie sesion de nuevo...', 'Su Sesion Expiro!');
        this.router.navigate(['/auth']);
      }
    }, error => {
      this.handleAlertsProvider.presentGenericAlert(error);
    });
  }


  getPool() {
    this.loaderValue.updateIsloading(true);
    this.admin.getPoolForEdit(this.currentPool).subscribe(data => {
      this.loaderValue.updateIsloading(false);
      if (data.code === 'D200') {
        console.log(data);
        this.usersForPool = data.data.usersForPool;
        this.selection = new SelectionModel<UserData>(true, data.data.usersForPool);
        this.poolData = data.data;
        this.updateForms();
        this.makeMatches();
      } else if (data.code === 'A401' || data.code === 'A302' || data.code === 'A403') {
        this.handleAlertsProvider.presentGenericAlert('Por favor inicie sesion de nuevo...', 'Su Sesion Expiro!');
        this.router.navigate(['/auth']);
      }
    }, error => {
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
      password: [''],
      rules: [''],
    });
    this.results = this.fb.group({
      result: ['', Validators.required],
      winner: ['', Validators.required],
      draw: ['', Validators.required],
      loser: ['', Validators.required]
    });
    this.endPools = this.fb.group({
      amountInput: ['', Validators.required],
      coinsInput: ['', Validators.required],
      dateFinish: ['', Validators.required],
      timeFinish: ['', Validators.required],
      awardType: ['', Validators.required],
      awardValue: ['', Validators.required]
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
    this.config.get('rules').setValue(this.poolData.rules);

    this.results.get('winner').setValue(this.poolData.winner);
    this.results.get('loser').setValue(this.poolData.loser);
    this.results.get('draw').setValue(this.poolData.draw);
    this.results.get('result').setValue(this.poolData.result);

    this.endPools.get('amountInput').setValue(this.poolData.amountInput);
    this.endPools.get('coinsInput').setValue(this.poolData.coinsInput);
    // console.log(moment(this.poolData.dateFinish, 'YYYY-MM-DD').add(1, 'days').format('YYYY-MM-DD'));
    this.endPools.get('dateFinish').setValue(moment(this.poolData.dateFinish, 'YYYY-MM-DD').add(1, 'days').format('YYYY-MM-DD'));
    this.endPools.get('timeFinish').setValue(this.poolData.timeFinish === null ? null : this.poolData.timeFinish.split(':')[0] + ':' + this.poolData.timeFinish.split(':')[1] + ' ' + (Number(this.poolData.timeFinish.split(':')[0]) > 11 ? 'pm' : 'am'));
    this.endPools.get('awardType').setValue(this.poolData.awardType);
    this.endPools.get('awardValue').setValue(this.poolData.awardValue);
  }

  makeMatches() {
    this.poolData.matchesInfo.forEach(match => {
      match.time = match.time.split(':')[0] + ':' + match.time.split(':')[1] + ' ' + (Number(match.time.split(':')[0]) > 11 ? 'pm' : 'am');
    });
    this.arrayOfMatches = this.poolData.matchesInfo;
  }

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
    this.loaderValue.updateIsloading(true);
    const {name, sport, color, matches, usersLimit, status, penalty, groups, teamsPerGroup, type, league, password,
      rules } = this.config.value;
    const {amountInput, coinsInput, dateFinish, timeFinish, awardType, awardValue} = this.endPools.value;
    // convert all times in good format
    this.arrayOfMatches.forEach(match => {
      if (match.time.toUpperCase().includes('PM')) {
        const newTime = match.time.toUpperCase().replace(' PM', '');
        match.time = (Number(newTime.split(':')[0]) + 12) + ':' + newTime.split(':')[1];
      }
    });

    const finishDate = (dateFinish === moment(this.poolData.dateFinish, 'YYYY-MM-DD').add(1, 'days').format('YYYY-MM-DD')) ?
      moment(dateFinish, 'YYYY-MM-DD').subtract(1, 'days').format('YYYY-MM-DD') : dateFinish;

    const matchesInfo = this.arrayOfMatches;
    const usersForPool = this.selection.selected;
    const {result, winner, draw, loser} = this.results.value;
    this.admin.createAndUpdatePool(name, sport, color, matches, usersLimit, status, penalty, groups, teamsPerGroup, type, league, password,
      rules, matchesInfo, usersForPool, result, winner, draw, loser, amountInput, coinsInput, finishDate, timeFinish, awardType, awardValue,
      'update', this.currentPool).subscribe(data => {
      this.loaderValue.updateIsloading(false);
      if (data.code === 'D200') {
        this.handleAlertsProvider.presentSnackbarSuccess('Se Actualizo la quiniela con exito!');
        this.router.navigate(['admin/pools/list-of-pools']);
      } else if (data.code === 'A401' || data.code === 'A302' || data.code === 'A403') {
        this.handleAlertsProvider.presentGenericAlert('Por favor inicie sesion de nuevo...', 'Su Sesion Expiro!');
        this.router.navigate(['/auth']);
      }
    }, error => {
      this.handleAlertsProvider.presentGenericAlert(error);
    });
  }

  handleUpload(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const imageData = reader.result;
      const imageName = await this.admin.uploadFile(imageData).toPromise();
      this.config.get('rules').setValue(imageName);
    };
  }

  openUploadFiles() {
    const el: HTMLElement = this.inputFiles.nativeElement as HTMLElement;
    el.click();
  }

  getAward() {
    console.log(this.awardType);
    if (this.awardType === 'total') {
      const value = this.selection.selected.length * Number(this.endPools.get('amountInput').value === '' ? 0 : this.endPools.get('amountInput').value);
      this.endPools.get('awardValue').setValue(value);

    } else {
      this.endPools.get('awardValue').setValue(0);
    }
  }

  showSelection(stepper) {
    if (this.selection.selected.length > this.limitOfUsers) {
      this.handleAlertsProvider.presentGenericAlert(`Has superado el limite de participantes en esta quiniela, el limite es <b>${this.limitOfUsers}</b>`, 'Aviso!');
    } else {
      stepper.next();
    }
    console.log(this.selection.selected.length);
  }

  validateUsers(stepper) {
    const {amountInput, coinsInput, dateFinish, timeFinish, awardType, awardValue} = this.endPools.value;
    let isValid = true;
    // verificamos que todos los usuarios cumplan los requisitos de ingreso de la quiniela
    const users = this.selection.selected;

    users.forEach(userId => {
      if (!this.getExistInUsersSelected(userId)) {
        const user = this.usersData.find(x => x.rowid === userId);
        if (user.amount < amountInput || user.coins < coinsInput) {
          isValid = false;
        }
      }
    });

    if (isValid) {
      stepper.next();
    } else {
      this.handleAlertsProvider.presentGenericAlert(`Uno de los usuarios no cumple los requisitos minimos para el ingreso de la quiniela!`, 'Aviso!');
    }
  }

  getExistInUsersSelected(id) {
    // console.log(id, this.usersForPool.find(x => x === id) !== undefined, this.usersForPool);
    return this.usersForPool.find(x => x === id) !== undefined;
  }
}
