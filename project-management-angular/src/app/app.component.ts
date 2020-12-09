import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(
    private http : HttpClient
  ){
  }

  member:any = '';
  header = {
    Authorization : localStorage.getItem('token')
  }

  ngOnInit(){    
  }
  title = 'project-management-angular';
}
