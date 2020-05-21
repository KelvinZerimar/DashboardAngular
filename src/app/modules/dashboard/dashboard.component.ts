import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { DashboardService } from '../dashboard.service';
import { Router } from '@angular/router';

export interface PeriodicElement {
  region: string;
  country: string;
  itemType: string;
  salesChannel: string;
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  bigChart = [];
  cards = [];
  pieChart = [];
  dataSource;
  salesList;
  displayedColumns: string[] = ['region', 'country', 'itemType', 'salesChannel'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private router: Router, private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.dashboardService.getSaleList().then(
      result => {
        this.salesList = result;
        this.dataSource = new MatTableDataSource<PeriodicElement>(this.salesList);
        this.dataSource.paginator = this.paginator;
      });
    this.bigChart = this.dashboardService.bigChart();
    this.cards = this.dashboardService.cards();
    this.pieChart = this.dashboardService.pieChart();
  }

}
