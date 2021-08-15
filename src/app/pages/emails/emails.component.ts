import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AdminService} from '../../services/admin.service';
import {HandleAlertsProvider} from '../../utilities/providers/handle-alerts-provider';
import {Router} from '@angular/router';
import {LoaderProvider} from '../../utilities/providers/loader-provider';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

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
  selector: 'app-emails',
  templateUrl: './emails.component.html',
  styleUrls: ['./emails.component.css']
})
export class EmailsComponent implements OnInit {
  users = [];
  emailForm: FormGroup;

  displayedColumns: string[] = ['username', 'email', 'opts'];
  dataSource: MatTableDataSource<UserData>;
  selection = new SelectionModel<UserData>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private admin: AdminService,
    private handleAlertsProvider: HandleAlertsProvider,
    private router: Router,
    private fb: FormBuilder,
    private loaderValue: LoaderProvider,
  ) {
    this.admin.initToken();
  }

  ngOnInit(): void {
    this.setUsersData();
    this.createForm();
  }

  private createForm() {
    this.emailForm = this.fb.group({
      category: ['', Validators.required],
      manualSelection: [''],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  sendEmail() {
    this.loaderValue.updateIsloading(true);
    const emailForm = this.emailForm.value;
    emailForm.manualSelection = this.selection.selected;
    this.admin.sendEmail(emailForm.category, emailForm.subject, emailForm.manualSelection, emailForm.message).subscribe(res => {
      this.loaderValue.updateIsloading(false);
      if (res.code === 'D200') {
        this.handleAlertsProvider.presentSnackbarSuccess('Se ha enviado el mensaje con exito!');
        this.emailForm.reset();
      } else if (res.code === 'D401' || res.code === 'D302' || res.code === 'D403') {
        this.handleAlertsProvider.presentGenericAlert('Por favor inicie sesion de nuevo...', 'Su Sesion Expiro!');
        this.router.navigate(['/auth']);
      }
    }, err => {
      this.handleAlertsProvider.presentGenericAlert(err);
    });
  }

  setUsersData() {
    this.loaderValue.updateIsloading(true);
    this.admin.getUsers().subscribe(res => {
      this.loaderValue.updateIsloading(false);
      if (res.code === 'D200') {
        console.log('res: ', res);
        this.users = res.data;
        this.dataSource = new MatTableDataSource<UserData>(res.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      } else if (res.code === 'D401' || res.code === 'D302' || res.code === 'D403') {
        this.handleAlertsProvider.presentGenericAlert('Por favor inicie sesion de nuevo...', 'Su Sesion Expiro!');
        this.router.navigate(['/auth']);
      }
    }, err => {
      this.handleAlertsProvider.presentGenericAlert(err);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
