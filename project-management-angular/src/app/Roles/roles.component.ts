import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RoleService } from '../Services/role.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {


  _roles = [];
  api = 'http://localhost:3000';
  _error : any = '';
  
  header = {
    Authorization : 'Bearer ' +  localStorage.getItem('token')
  }

  constructor(
    private http : HttpClient,
    private roleservice : RoleService,
  ) {
    this.loadRoles();
   }

  ngOnInit(): void {}


  async loadRoles(){

    try
    {
      const data : any = await this.roleservice.sendGetRequest('/role');
          data.forEach(element => {
          this._roles.push(element);
        }); 
    }
    catch (error) {
      console.log('Error',error.error);
    }

  }

  async onSaveRole(roles)
  {
    if(!roles.valid)
    {
      return false;
    }

    try
    {
      this.roleservice.validateForm(roles);
      const data = await this.roleservice.sendPostRequest('/role/sub',roles.value);
      console.log('Success',data);
      this._roles.push(data);
      roles.resetForm();
      this._error = '';
    }
    catch (error) {
      this._error = error.message;
      console.log('Error',error.message); 
    }

  }

}