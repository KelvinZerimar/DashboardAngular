import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {
  sales;
  constructor(private router: Router, private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.dashboardService.getSaleList().then(
      result => {
        this.sales = result;
      });
  }

}
