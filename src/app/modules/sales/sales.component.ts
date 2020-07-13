import { Component, OnInit, ViewChild  } from '@angular/core';
import { SalesService } from '../sales.service';
import { Router } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular';
import { GridOptions, IGetRowsParams } from 'ag-grid-community';
import * as moment from 'moment';
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
      // { headerName: 'Order Date', field: 'orderDate', valueFormatter: this.dateFormatter, sortable: true },
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
    console.log('On Grid Ready');
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    const datasource = {
      // tslint:disable-next-line: no-shadowed-variable
      getRows: (params: IGetRowsParams) => {
        //  TODO: Call a service that fetches list of users
        console.log('Fetching startRow ' + params.startRow + ' of ' + params.endRow);
        console.log(params);
        this.showConfigResponse();
        this.salesService.getSales(params.startRow, params.endRow)
        .subscribe(result => {
              this.sales = result.body;
              this.totalrecords = Number(result.headers.get('X-Pagination'));
              console.log(result);
              params.successCallback(this.sales, this.totalrecords); // this.sales.length);
            });
        /* this.salesService.getSales(params)
            .subscribe(data => {
              console.log(data);
              const newLocal = 'sales';
              params.successCallback(data[0], data['totalRecords'])
        }); */
      }
    };

    this.gridApi.setDatasource(datasource);
  }

  onPaginationChanged(params) {

  }
  dateFormatter(params) {
    // return moment(params.value).format('D MMM YYYY HH:mm');
    return moment(params.value).format('L');
  }
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
  showConfigResponse() {
    this.salesService.getConfigResponse()
      // resp is of type `HttpResponse<Config>`
      .subscribe(resp => {
        // display its headers
        const keys = resp.headers.keys();
        console.log(resp.headers.get('X-Pagination'));
      },
      error => {
          console.error(error); });
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
