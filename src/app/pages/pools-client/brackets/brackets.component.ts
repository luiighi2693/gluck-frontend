import {AfterViewInit, Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {groups, groupsTableData} from '../../../utilities/mockData/mockData';
import {AdminService} from '../../../services/admin.service';
import {LoaderProvider} from '../../../utilities/providers/loader-provider';
import {environment} from '../../../../environments/environment';
import {ActivatedRoute} from '@angular/router';

interface GroupData {
  id: string | number;
  name: string;
}


@Component({
  selector: 'app-brackets',
  templateUrl: './brackets.component.html',
  styleUrls: ['./brackets.component.css']
})
export class BracketsComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['rowid', 'name', 'data1', 'data2', 'data3', 'data4', 'data5', 'data6'];
  dataSource: MatTableDataSource<GroupData>;
  groups = groups;
  rankingData = [];
  imagePath;
  bracketsData = [];
  champion: any;
  poolId: any;
  dataSources = [];

  constructor(
    private admin: AdminService,
    private loaderValue: LoaderProvider,
    private route: ActivatedRoute,
  ) {
    this.imagePath = environment.basePath;
  }

  ngOnInit(): void {
    this.route.params.subscribe(res => {
      this.poolId = res.id;
    });
    this.getRankingByPool(this.poolId);
  }

  ngAfterViewInit() {
    // setTableData();
    // this.dataSource = new MatTableDataSource<GroupData>(this.groupsTableData);
  }

  getRankingByPool(id) {
    this.loaderValue.updateIsloading(true);
    this.admin.getRankingForPool(id).subscribe(res => {
      this.loaderValue.updateIsloading(false);
      this.rankingData = res.groups;
      this.bracketsData = res.brackets;
      this.champion = res.champion;

      this.rankingData.forEach(group => {
        let index = 1;
        group.results.forEach(result => {
          result.rowid = index;
          index++;
        });
        this.dataSources.push(new MatTableDataSource<GroupData>(group.results));
      });
    });
  }
}
