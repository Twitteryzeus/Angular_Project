import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  api = 'http://localhost:3000';

  constructor(
    private http : HttpClient
  ) { }

  header = {
    Authorization : localStorage.getItem('token')
  }

  validateForm(todoform:any){
    const gotFields : any = Object.values(todoform.value);

    gotFields.forEach(element => {
      if(element == "")
      {
        throw new Error('Every field is required');
      }
    });
    return true;
  }

  sendGetRequest(url,pid){

    return new Promise((resolve,reject) => {
    this.http.get(this.api+url+pid,{
      headers: this.header
    })
    .subscribe(
      (success:any) => {
        resolve(success)
      },

      (error)=> {
        reject(error)
      }
    );
  }    
    );
  }

  sendUpdateRequest(url,tid,tstatus){
    return new Promise((resolve,reject) => {

      var change = {
        id: tid,
        status : tstatus
      }

      this.http.patch(this.api+url,change,{
        headers: this.header
      })
      .subscribe(
        (success) => {
          resolve(success);
        },
  
        (error) => {
          reject(error);
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
      (success:any) => {
        resolve(success)
      },

      (error) => {
        reject(error)
      }
    );
    });
  }
}