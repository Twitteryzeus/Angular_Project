import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddsubmemberComponent } from './addsubmember/addsubmember.component';
import { CommentsComponent } from './Comments/comments.component';
import { DashboardComponent } from './Dashboard/dashboard.component';
import { SidebarComponent } from './Layout/sidebar/sidebar.component';
import { LoginComponent } from './Login/login.component';
import { ProjectsComponent } from './Projects/projects.component';
import { RegisterComponent } from './Register/register.component';
import { RolesComponent } from './Roles/roles.component';
import { TodosComponent } from './Todos/todos.component';
import { GetAllMembersComponent } from './get-all-members/get-all-members.component';
import { HeaderComponent } from './layout/header/header.component';
import { DefaultComponent } from './layout/default/default.component';
import { MemberchatComponent } from './memberchat/memberchat.component';

@NgModule({
  declarations: [
    AppComponent,
    AddsubmemberComponent,
    CommentsComponent,
    DashboardComponent,
    SidebarComponent,
    LoginComponent,
    ProjectsComponent,
    RegisterComponent,
    RolesComponent,
    TodosComponent,
    GetAllMembersComponent,
    HeaderComponent,
    DefaultComponent,
    MemberchatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
