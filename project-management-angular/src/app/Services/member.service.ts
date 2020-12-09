import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { element } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  api = 'http://localhost:3000';
  constructor(
    private http: HttpClient
  ) { }

  header = {
    Authorization: localStorage.getItem('token')
  }

  validateForm(submember) {
    var gotValues: Array<any> = Object.values(submember.value);
    if(submember.value.password != submember.value.cpassword){
      throw new Error('Password must be same');
    }
    
    gotValues.forEach((element) => {
      if(element === "")
      {
        throw new Error('All fields are required!');
      }
    });

    return true;
  }

  sendGetRequest(url) {

    return new Promise((resolve, reject) => {
      this.http.get(`${this.api}${url}`, {
        headers: this.header
      }).subscribe(
        (success) => {
          resolve(success);
        },

        (error) => {
          reject(error);
        }
      );
    })
  }

  sendPostRequest(url, data = {}) {
    return new Promise((resolve, reject) => {
      this.http.post(`${this.api}${url}`, data, {
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
