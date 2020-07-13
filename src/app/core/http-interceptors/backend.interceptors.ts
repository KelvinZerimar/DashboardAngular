import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpResponse, HttpEvent } from '@angular/common/http';
import { mergeMap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
// import * as _ from 'underscore';
import { SalesService } from '../../modules/sales.service';
import { Router } from '@angular/router';

@Injectable()
export class BackendInterceptor implements HttpInterceptor {
    // sales;
    // constructor(private router: Router, private salesService: SalesService) {
        // this.salesService.getSaleList().then(
        //      result => {
        //           this.sales = result;
        //         });
    // }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('Backend Interepted');
        req = req.clone({
            // withCredentials: true
        });

        return next.handle(req);
        // return of(null).pipe(mergeMap(() => {
        //     console.log('Backend Interepted');
            // //
            /* let sortedSales = this.sales;
            let sortModel = null;
            let sortColId = '';
            let sort = ''; // asc or desc
            let filterModel;

            sortModel = req.body.sortModel;
            filterModel = req.body.filteModel; */

            /* if (sortModel.length) {
                // implement fake sorting
                sortModel.forEach(element => {
                    sortColId = element.colId;
                    sort = element.sort;
                });
 */
                // if (sort === 'asc') {
                //     sortedSales = _.sortBy(this.sales, sortColId);
                // } else {
                //     sortedSales = _.sortBy(this.sales, sortColId).reverse();
                // }
            // }

            /* const resBody = {
                users: sortedSales.slice(req.body.startRow, req.body.endRow),
                totalRecords: this.sales.length
            };
*/
            // return of(new HttpResponse({ status: 200 }) );
        // }));
    }

}
