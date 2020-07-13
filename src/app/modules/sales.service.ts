import { Injectable } from '@angular/core';
import { HttpClient, HttpParams , HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})

export class SalesService {
  constructor(private http: HttpClient) {}
  // tslint:disable-next-line: variable-name
  getSales(_skip: number, _limit: number) {
    // console.log('params in getSales: ' + _skip + ' | ' + _limit);
    const parames = new HttpParams()
    .set('skip', _skip.toString())
    .set('limit', _limit.toString());
    //
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      observe: 'response' as 'response',
      params: parames
    };
    // return this.http.get('api/sales', { params: parames  });
    return this.http.get('api/sales', httpOptions);
  }
  //
  getSaleList() {
    console.log(environment.apiURL);
    return this.http.get('api/sales').toPromise();
  }
}
