import {AfterViewInit, Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {groups, groupsTableData} from '../../../utilities/mockData/mockData';

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
  displayedColumns: string[] = ['rowid', 'name', 'data1', 'data2', 'data3', 'data4', 'data5', 'data6', 'data7', 'data8'];
  dataSource: MatTableDataSource<GroupData>;
  groups = groups;
  groupsTableData = groupsTableData;

  constructor() {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource<GroupData>(this.groupsTableData);
  }
}
