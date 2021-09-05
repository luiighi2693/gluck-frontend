import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {HandleAlertsProvider} from '../../../utilities/providers/handle-alerts-provider';
import {Router} from '@angular/router';
import {AdminService} from '../../../services/admin.service';
import {environment} from '../../../../environments/environment';
import {LoaderProvider} from '../../../utilities/providers/loader-provider';

export interface UserData {
  rowid: string;
  username: string;
  name: string;
  email: string;
  amount: number;
  status: number;
  coins: number;
}


@Component({
  selector: 'app-add-pool',
  templateUrl: './add-pool.component.html',
  styleUrls: ['./add-pool.component.css']
})
export class AddPoolComponent implements OnInit, AfterViewInit {
  config: FormGroup;
  users: FormGroup;
  usersData = [];
  matches: FormGroup;
  poolResults: FormGroup;
  endPools: FormGroup;
  amountOfMatches: number;
  amountOfGroups: number;
  amountOfTeams: number;
  doPenaltiesExist = '';
  arrayOfMatches = [];
  arrayOfGroups = [];
  sports = [];
  teams = [];
  limitOfUsers: any;
  hide = true;

  displayedColumns: string[] = ['rowid', 'username', 'name', 'email', 'amount', 'coins', 'status', 'opts'];
  displayedColumnsMobile: string[] = ['username', 'opts'];
  dataSource: MatTableDataSource<UserData>;
  selection = new SelectionModel<UserData>(true, []);


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  imagePath;

  @ViewChild('inputFiles', {static: true}) inputFiles: ElementRef;

  awardType;

  constructor(
    private handleAlertsProvider: HandleAlertsProvider,
    private router: Router,
    private admin: AdminService,
    private fb: FormBuilder,
    private loaderValue: LoaderProvider,
  ) {
    this.admin.initToken();
    this.imagePath = environment.basePath;
  }

  ngOnInit(): void {
    this.createForms();
  }

  ngAfterViewInit() {
    this.setUsersData();
    this.setSportsData();
    this.setTeamsData();
  }

  setUsersData() {
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

  setTeamsData() {
    this.loaderValue.updateIsloading(true);
    this.admin.getTeams().subscribe(data => {
      this.loaderValue.updateIsloading(false);
      if (data.code === 'D200') {
        this.teams = data.data.sort((a, b) => {
          if (a.name < b.name) { return -1; }
          if (a.name > b.name) { return 1; }
          return 0;
        });
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
      groups: [''],
      teamsPerGroup: [''],
      type: ['', Validators.required],
      league: ['', Validators.required],
      password: [''],
      rules: ['']
    });
    this.poolResults = this.fb.group({
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

  makeSecondStep() {
    this.arrayOfMatches = [];
    this.arrayOfGroups = [];
    this.limitOfUsers = Number(this.config.value.usersLimit);
    this.doPenaltiesExist = this.config.value.penalty;

    for (let i = 0; i < this.amountOfGroups; i++) {
      // tslint:disable-next-line:prefer-const
      let group = {
        name: '',
        teams: []
      };

      for (let j = 0; j < this.amountOfTeams; j++) {
        group.teams[j] = 0;
      }

      this.arrayOfGroups.push(group);
    }

    for (let i = 0; i < this.amountOfMatches; i++) {
      this.arrayOfMatches.push({
        title: '', team1: '', penalty1: '', result1: '', team2: '', penalty2: '', result2: '', date: '',
        time: '', status: '', result: 'sin comenzar',
      });
    }
  }

  showSelection(stepper) {
    if (this.selection.selected.length > this.limitOfUsers) {
      this.handleAlertsProvider.presentGenericAlert(`Has superado el limite de participantes en esta quiniela, el limite es <b>${this.limitOfUsers}</b>`, 'Aviso!');
    } else {
      stepper.next();
    }
  }

  validateUsers(stepper) {
    const {amountInput, coinsInput, dateFinish, timeFinish, awardType, awardValue} = this.endPools.value;
    let isValid = true;
    // verificamos que todos los usuarios cumplan los requisitos de ingreso de la quiniela
    const users = this.selection.selected;

    users.forEach(userId => {
      const user = this.usersData.find(x => x.rowid === userId);
      if (user.amount < amountInput || user.coins < coinsInput) {
        isValid = false;
      }
    });

    if (isValid) {
      stepper.next();
    } else {
      this.handleAlertsProvider.presentGenericAlert(`Uno de los usuarios no cumple los requisitos minimos para el ingreso de la quiniela!`, 'Aviso!');
    }
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
    const {
      name, sport, color, matches, usersLimit, status, penalty, groups, teamsPerGroup, type, league, password,
      rules
    } = this.config.value;
    const {amountInput, coinsInput, dateFinish, timeFinish, awardType, awardValue} = this.endPools.value;
    this.arrayOfMatches.forEach(match => {
      if (match.time.toUpperCase().includes('PM')) {
        const newTime = match.time.toUpperCase().replace(' PM', '');
        match.time = (Number(newTime.split(':')[0]) + 12) + ':' + newTime.split(':')[1];
      }
    });

    const matchesInfo = this.arrayOfMatches;
    const groupsInfo = this.arrayOfGroups;
    const usersForPool = this.selection.selected;
    const {result, winner, draw, loser} = this.poolResults.value;
    const colorValue = color.hex.includes('#') ? color.hex : `#${color.hex}`;
    this.admin.createAndUpdatePool(name, sport, colorValue, matches, usersLimit, status, penalty, groups, teamsPerGroup, type,
      league, password, rules, matchesInfo, groupsInfo, usersForPool, result, winner, draw, loser, amountInput, coinsInput, dateFinish, timeFinish,
      awardType, awardValue,
      'create').subscribe(data => {
      if (data.code === 'D200') {
        this.loaderValue.updateIsloading(false);
        this.handleAlertsProvider.presentSnackbarSuccess('Se creo la quiniela con exito!');
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
    if (this.awardType === 'total') {
      const value = this.selection.selected.length * Number(this.endPools.get('amountInput').value === '' ? 0 : this.endPools.get('amountInput').value);
      this.endPools.get('awardValue').setValue(value);

    } else {
      this.endPools.get('awardValue').setValue(0);
    }
  }

  validateChangeTeamGroup(event: any, i, j) {
    let result = [];
    result = result.concat(...this.arrayOfGroups.map(x => x.teams));

    // coincidences
    if (result.filter(x => x === event).length > 1) {
      setTimeout(() => {
        this.arrayOfGroups[i].teams[j] = 0;
        this.handleAlertsProvider.presentSnackbarError('Este Equipo ya fue seleccionado!');

      }, 300);
    }

  }
}
