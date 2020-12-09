import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as io from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-memberchat',
  templateUrl: './memberchat.component.html',
  styleUrls: ['./memberchat.component.css']
})

export class MemberchatComponent implements OnInit {

  constructor(
    private http : HttpClient,
    private route : ActivatedRoute
  ) { 
    this.socket = io(environment.SOCKET_ENDPOINT);
    this.socket.on('message',(message) => {
      console.log(message);
      this.chatArray.push(message);
    })
    this.getCurrentMember();
    this.getMyChats();
  }

  socket:any = '';
  from:any = '';
  to = this.route.snapshot.params['id'];
  recname = this.route.snapshot.params['name'];
  chatArray : Array<any> = [];

  ngOnInit(): void {
    
  }

  header = {
    Authorization : localStorage.getItem('token')
  }

  getMyChats(){
    this.http.get('http://localhost:3000/getchats',{
      headers: this.header
    })
    .subscribe(
      (success:any) => {
        success.forEach(element => {
          this.chatArray.push(element);
        });
      },

      (error) => {
        console.log('Error',error.error);
      }
    )
  }

  getCurrentMember(){
    this.http.get('http://localhost:3000/member',{
      headers: this.header
    })
    .subscribe(
      (success:any) => {
        this.from = success._id;
      },

      (error) => {
        console.log('Error',error);
      }
    );
  }

  onSendMessage(message)
  {
    if(!message.value) return false
    this.socket.emit('sendMessage',{
      to: this.to,
      from: this.from,
      chat: message.value
    });
    this.chatArray.push({
      to: this.to,
      from: this.from,
      chat: message.value
    });
    message.reset();
  }

}