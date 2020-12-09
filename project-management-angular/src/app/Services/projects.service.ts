import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  api = 'http://localhost:3000'
  constructor(
    private http : HttpClient
  ) { }

  header = {
    Authorization : localStorage.getItem('token')
  }

  sendGetRequest(url){
    return new Promise((resolve,reject) => {
      this.http.get(this.api+url,{
      headers: this.header
    })
    .subscribe(
      (success:any)=> {
        resolve(success)
      },

      (error)=>{
        reject(error)
      }
    );
    });
  }

  sendPostRequest(url,data){
    return new Promise((resolve,reject) => {
      this.http.post(this.api+url,data,{
        headers: this.header
      })
      .subscribe(
        (success) => {
          resolve(success);
        },

        (error) => {
          reject(error)
        }
      );
    });
  }
}
