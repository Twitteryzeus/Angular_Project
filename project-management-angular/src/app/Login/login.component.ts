import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';

@Component({
    selector : 'app-login',
    templateUrl : './login.component.html',
    styleUrls : ['./login.component.css']
})


export class LoginComponent implements OnInit {

    constructor(
        private http : HttpClient,
        private route : Router
    ){}


    ngOnInit(){

    }

    _error = '';

    sendToRegister(){
        this.route.navigateByUrl('/register');
    }

    doLogin(formData){
        
        if(!formData.valid){
            return false;
        }

        var header = {
            Authorization : 'Bearer ' + localStorage.getItem('token')
        }

        this.http.post('http://localhost:3000/member/signin',formData.value, {
            headers : header
        })
        .subscribe(
            (success : any) => {
                console.log('success',success);
                localStorage.setItem('token',success.token);
                this.route.navigateByUrl('');
                this._error = '';
            },

            (error) => {
                this._error = error.error;
                console.log('error',error.error);
            }
        );

    }

}