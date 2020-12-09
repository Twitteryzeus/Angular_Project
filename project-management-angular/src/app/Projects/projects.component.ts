import { Component, OnInit } from '@angular/core';

import { Member } from '../models/member.model'
import { Project } from '../models/project.model';
import { ProjectsService } from '../Services/projects.service';
import { MemberService } from '../Services/member.service';
import { DataService } from '../Services/data.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})

export class ProjectsComponent implements OnInit {

  constructor(
    private projectservice : ProjectsService,
    private memberservice : MemberService,
    private dataservice : DataService
  ) {
    this.getProjects();
    this.getMembers();
   }

  ngOnInit(): void {}
  members : Array<Member> = [];
  projects : Array<Project> = [];
  _error : any = '';

  async getMembers() {

    try {
      const success : any = await this.memberservice.sendGetRequest('/member/all');
      success.forEach((element) => {
              element.isSelected = false;
              this.members.push(new Member(element));
            });
    } catch (error) {
      console.log('Error',error.error);
    }
  }

  async getProjects(){
    
    try {
      const data:any = await this.projectservice.sendGetRequest('/project');
      data.forEach(element => {
        this.projects.push(new Project(element));
      });
    } catch (error) {
      console.log('Error',error.error);
    }
  }

  async onSaveProject(project)
  {
    if(!project.valid)
    {
      return false;
    }

    var selectedMembers = [];

    for (let i = 0; i < this.members.length; i++) {
      const m = this.members[i];

      if(m.isSelected){
        selectedMembers.push(m._id);
      }
      
    }

    var data = {
      title : project.value.title,
      description : project.value.description,
      team : selectedMembers
    }

    var requiredArray : Array<any> = ['title','description'];

    try {
      this.dataservice.validateForm(data,requiredArray);
      const success:any = await this.projectservice.sendPostRequest('/project',data);
      this.projects.push(new Project(success));
      this._error = '';
    } catch (error) {
      this._error = error.message;
      console.log('Error',error.message);
    }

    project.resetForm();
    
  }
}