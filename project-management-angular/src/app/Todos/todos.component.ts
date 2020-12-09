import { Component, OnInit } from '@angular/core';

//importing model
import { Member } from '../models/member.model';
import { Project } from '../models/project.model';
import { Todo } from '../models/todo.model';
import { ActivatedRoute } from '@angular/router';
import { TodosService } from '../Services/todos.service';
import { MemberService } from '../Services/member.service';
import { DataService } from '../Services/data.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  constructor(
    private route : ActivatedRoute,
    private todoservice : TodosService,
    private memberservice : MemberService,
    private dataservice : DataService,
  ) { 
    this.getMembers();
    this.getTodo();
  }

  ngOnInit(): void {
  }

  projects : Array<Project> = [];
  members : Array<Member> = [];
  todo: Array<Todo> = [];
  pid = this.route.snapshot.params['id'];
  _error : any = '';

  header = {
    Authorization: localStorage.getItem('token')
  }

  async getTodo(){
    
    try {
        const data : any = await this.todoservice.sendGetRequest('/todo/',this.pid);
        data.forEach(element => {
            this.todo.push(new Todo(element));
        });
    } catch (error) {
      console.log('Error',error.error);
    }
  }

  async getMembers(){
    
    try {
      const data : any = await this.memberservice.sendGetRequest('/member/all');
      data.forEach(element => {
        this.members.push(new Member(element));
      });
    } catch (error) {
      console.log('Error',error.error);
    }
  }

  async onChangeTodo(tid : any,e)
  {
    try
    {
      const data = await this.todoservice.sendUpdateRequest('/todo/updatetodo',tid,!e.target.checked);
    }
    catch (error) {
      console.log('Error',error.error);
    }
  }

  async onsubmittodo(todoform)
  {
    if(!todoform.valid)
    {
      return false;
    }
    
    todoform.value.inproject = this.pid
    
    try {

      var requiredFields : Array<any> = ['title','stage','priorities','assignedto','completedat'];
      this.dataservice.validateForm(todoform.value,requiredFields);
      const data : any = await this.todoservice.sendPostRequest('/todo',todoform.value);
      this.todo.push(new Todo(data));
      todoform.resetForm();
      console.log('Success',data);
    } catch (error) {
      this._error = error.message;
      console.log('Error',error.message);      
    }
    
  }
}