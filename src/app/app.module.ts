import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DefaultModule } from './layouts/default/default.module';
import { AgGridModule } from 'ag-grid-angular';

import { BackendInterceptor } from 'src/app/core/http-interceptors/backend.interceptors';

@NgModule({
  declarations: [
    AppComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DefaultModule,
    HttpClientModule,
    AgGridModule.withComponents(),
    ToastrModule.forRoot({
      progressBar: true
    })
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: BackendInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
