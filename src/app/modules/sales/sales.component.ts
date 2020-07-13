import { Component, OnInit, ViewChild  } from '@angular/core';
import { SalesService } from '../sales.service';
import { Router } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular';
import { GridOptions, IGetRowsParams } from 'ag-grid-community';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {
  @ViewChild('myGrid') myGrid: AgGridAngular;
  //
  gridOptions: Partial<GridOptions>;
  gridApi;
  gridColumnApi;
  columnDefs;
  cacheOverflowSize;
  maxConcurrentDatasourceRequests;
  infiniteInitialRowCount;
  //
  rowData: any;
  sales;
  totalrecords: number;
  //
  constructor(private router: Router, private salesService: SalesService) {
    this.columnDefs = [
      { headerName: 'Region', field: 'region', sortable: true, filter: 'agTextColumnFilter'},
      { headerName: 'Country', field: 'country', sortable: true, filter: 'agTextColumnFilter'},
      { headerName: 'Item Type', field: 'itemType', sortable: true },
      { headerName: 'Order Date', field: 'orderDate', type: 'date', sortable: true },
      { headerName: 'Units Cost', field: 'unitCost', minWidth: 80, maxWidth: 150, valueFormatter: this.currencyFormatter},
      { headerName: 'Unit Price', field: 'unitPrice',  minWidth: 80, maxWidth: 150, cellRenderer: this.CurrencyCellRendererEUR }
    ];

    this.cacheOverflowSize = 2;
    this.maxConcurrentDatasourceRequests = 2;
    this.infiniteInitialRowCount = 2;

    this.gridOptions = {
      headerHeight: 45,
      rowHeight: 30,
      cacheBlockSize: 90,
      paginationPageSize: 90,
      rowModelType: 'infinite'
    };
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    const datasource = {
      // tslint:disable-next-line: no-shadowed-variable
      getRows: (params: IGetRowsParams) => {
        this.salesService.getSales(params.startRow, params.endRow)
        .subscribe(result => {
              this.sales = result.body;
              this.totalrecords = Number(result.headers.get('X-Pagination'));
              params.successCallback(this.sales, this.totalrecords); // this.sales.length);
            });
      }
    };

    this.gridApi.setDatasource(datasource);
  }

  onPaginationChanged(params) {}
  //
  currencyFormatter(params) {
    return Math.floor(params.value).toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
  }
  CurrencyCellRendererEUR(params: any) {
    const inrFormat = new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2
    });
    return inrFormat.format(params.value);
  }
  //
  ngOnInit() { }
  //
  // ngOnInit(): void {
  //  this.dashboardService.getSaleList().then(
  //    result => {
  //      this.sales = result;
  //    });
  // }
}
