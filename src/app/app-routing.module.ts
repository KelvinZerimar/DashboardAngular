import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { SalesComponent } from './modules/sales/sales.component';
import { PostsComponent } from './modules/posts/posts.component';
import { UserComponent } from './modules/user/user.component';
import { RegistrationComponent } from './modules/user/registration/registration.component';
import { LoginComponent } from './modules/user/login/login.component';

const routes: Routes = [{
  path: '', component: DefaultComponent,
    children: [
      { path: '', component: DashboardComponent}
      ,
      { path: 'sales', component: SalesComponent}
      ,
      { path: 'posts', component: PostsComponent}
    ]
},
{
  path: 'user', component: UserComponent,
  children: [
    { path: 'registration', component: RegistrationComponent },
    { path: 'login', component: LoginComponent }
  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
