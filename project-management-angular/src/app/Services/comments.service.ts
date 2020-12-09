import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  api = 'http://localhost:3000';
  constructor(
    private http : HttpClient,
  ) { }

  header = {
    Authorization : localStorage.getItem('token')
  }

  validateForm(commentform){
    let gotFields = Object.values(commentform.value);
    gotFields.forEach(element => {
      if(element == '')
      {
        throw new Error('Every field is required');
      }
    });
    return true;
  }

    sendGetRequest(url,id={}){
      return new Promise((resolve,reject) => {
        this.http.get(this.api+'/'+id+url,{
          headers: this.header
        })
        .subscribe(
          (success:any) => {
            resolve(success);
          },
    
          (error) => {
            console.log(error);
            reject(error)
          }
        )
      });
    }

    sendPostRequest(url,data={}){
      return new Promise((resolve,reject) => {
        this.http.post(this.api+url,data,{
          headers: this.header
        })
        .subscribe(
          (success) => {
            resolve(success)
          },

          (error) => {
            reject(error)
          }
        );
      });
    }
}
