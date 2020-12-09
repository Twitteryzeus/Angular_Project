import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddsubmemberComponent } from './addsubmember/addsubmember.component';
import { AuthGuard } from './auth.guard';
import { CommentsComponent } from './Comments/comments.component';
import { DashboardComponent } from './Dashboard/dashboard.component';
import { GetAllMembersComponent } from './get-all-members/get-all-members.component';
import { DefaultComponent } from './layout/default/default.component';
import { LoginComponent } from './Login/login.component';
import { MemberchatComponent } from './memberchat/memberchat.component';
import { ProjectsComponent } from './Projects/projects.component';
import { RegisterComponent } from './Register/register.component';
import { RolesComponent } from './Roles/roles.component';
import { TodosComponent } from './Todos/todos.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path : '',
    component : DefaultComponent,
    canActivate : [AuthGuard],
    children : [
      {
        path: '',
        component: DashboardComponent,
      },
      
      {
        path: 'addsubmember',
        component: AddsubmemberComponent
      },
    
      {
        path: ':id/todos',
        component: TodosComponent
      },
      {
        path: 'projects',
        component: ProjectsComponent,
      },
      {
        path: 'roles',
        component: RolesComponent
      },
      {
        path: ':id/comments',
        component: CommentsComponent
      },
      {
        path: 'getallmember',
        component: GetAllMembersComponent
      },
      {
        path: ':id/:name/memberchat',
        component: MemberchatComponent
      }
    ]

  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
