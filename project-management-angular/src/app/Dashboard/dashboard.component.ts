import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

//importing models
import { Member } from '../models/member.model';
import { Project } from '../models/project.model';
import { Todo } from '../models/todo.model';
import { element, error } from 'protractor';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private http : HttpClient
  ) {
    this.getAllData();
   }  

  header = {
    Authorization : localStorage.getItem('token')
  }
  members: Array<Member> = [];
  projects: Array<Project> = [];
  todos: Array<Todo> = [];
  ctodos:any = 0;
  ptodos:any = 0;

  getAllData()
  {
    this.http.get('http://localhost:3000/getAllData',{
      headers: this.header
    })
    .subscribe(
      (success:any) => {
        success.memberObj.forEach(element => {
          this.members.push(new Member(element));
        });

        success.project.forEach(element => {
          this.projects.push(new Project(element));
        });

        success.todo.forEach(element => {
          this.todos.push(new Todo(element));
        });
        this.todos.forEach(element => {
          if(element.status.toString() == 'false')
          {
            this.ctodos++;
          }
          if(element.status.toString() == 'true')
          {
            this.ptodos++;
          }
        });
      },

      (error) => {
        console.log('Error',error);
      }
    );
  }

  ngOnInit(): void {
  }

}