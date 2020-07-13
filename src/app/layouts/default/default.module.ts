import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';

import { DefaultComponent } from './default.component';
import { DashboardComponent } from 'src/app/modules/dashboard/dashboard.component';
import { PostsComponent } from 'src/app/modules/posts/posts.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { LoginComponent } from 'src/app/modules/user/login/login.component';
import { RegistrationComponent } from 'src/app/modules/user/registration/registration.component';
import { UserComponent } from 'src/app/modules/user/user.component';
import { SalesComponent } from '../../modules/sales/sales.component';

import { DashboardService } from 'src/app/modules/dashboard.service';
import { SalesService } from 'src/app/modules/sales.service';
import { UserService } from 'src/app/modules/user.service';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [
    DefaultComponent,
    DashboardComponent,
    PostsComponent,
    LoginComponent,
    RegistrationComponent,
    UserComponent,
    SalesComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    MatSidenavModule,
    MatDividerModule,
    FlexLayoutModule,
    MatCardModule,
    MatPaginatorModule,
    MatTableModule,
    AgGridModule.withComponents()
  ],
  providers: [
    DashboardService,
    SalesService,
    UserService
  ]
})
export class DefaultModule { }
