import { Component, OnInit } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

    constructor(
        private http : HttpClient,
        private route : Router
    ){

    }

    onToLogin(){
        this.route.navigateByUrl('/login');
    }

    ngOnInit(){

    }

    onRegistering(registration)
    {
        if(!registration.valid)
        {
            return false;
        }

        if(registration.value.password !== registration.value.cpassword)
        {
            return false;
        }

        var header = {
            Authorization : 'Bearer ' + localStorage.getItem('token')
        }

        this.http.post('http://localhost:3000/member/signup',registration.value,{
            headers: header
        }).subscribe(
            (success: any)=> {
                console.log('Success',success);
                localStorage.setItem('token', success.token);
                this.route.navigateByUrl('/login');
            },

            (error)=>{
                console.log('Error',error.error);
            }
        );

    }
}