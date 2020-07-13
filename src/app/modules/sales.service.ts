import { Injectable } from '@angular/core';
import { HttpClient, HttpParams , HttpHeaders, HttpResponse, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent  } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SalesService {
  constructor(private http: HttpClient) {}
  // configUrl = environment.apiURL + 'api/sales';
  configUrl = 'api/sales';
  //
  fetch() {
    return this.http.get('https://jsonplaceholder.typicode.com/todos/1');
  }
  //
  public get(url: string = ''): Observable<any> {
    return this.http.get(url, { withCredentials: true });
}
//
  getConfigResponse(): Observable<HttpResponse<Config>>{
    // now returns an Observable of Config
    return this.http.get<Config>(
      this.configUrl, { observe: 'response' }); // , withCredentials: true });
    //  return this.get(this.configUrl);
  }
  //
  getCountRows()
  {
    /* const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      observe: 'response' as 'response'
    };
    return this.http.get(environment.apiURL + 'api/sales', httpOptions)
    .subscribe((resp: HttpResponse<any>) => console.log(resp.headers)); */
    //
    return this.http
    .get<any>(environment.apiURL + 'api/sales', {observe: 'response'})
    .subscribe((resp: HttpResponse<any>) => {
          console.log(resp.headers);
          console.log(resp.headers.get('X-Pagination'));
          console.log(resp.headers.keys);
          // console.log(resp.body);
        });
  }
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
    return this.http.get<Config>('api/sales', httpOptions);
  }
  //
  getSaleList() {
    console.log(environment.apiURL);
    return this.http.get('api/sales').toPromise();
  }
}
export interface Config {
  heroesUrl: string;
  textfile: string;
}
