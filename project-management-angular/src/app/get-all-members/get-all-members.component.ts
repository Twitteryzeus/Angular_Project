import { Component, OnInit } from '@angular/core';

//import module
import { Member } from '../models/member.model'
import { MemberService } from '../Services/member.service';

@Component({
  selector: 'app-get-all-members',
  templateUrl: './get-all-members.component.html',
  styleUrls: ['./get-all-members.component.css']
})
export class GetAllMembersComponent implements OnInit {

  constructor(
    private memberservice : MemberService
  ) { 
    this.getUsers();
    this.getMemberID();
  }

  members : Array<Member> = [];
  memberid : any = '';

  header = {
    Authorization: localStorage.getItem('token')
  }

  async getMemberID(){

    try {
      const data : any = await this.memberservice.sendGetRequest('/member');
      this.memberid = data._id;
    } catch (error) {
      console.log('Error',error.error);
    }

  }

  async getUsers()
  {
    try {
      const data : any = await this.memberservice.sendGetRequest('/member/all');
      data.forEach(element => {
        this.members.push(new Member(element));
      });
    } catch (error) {
      console.log('Error',error.error);
    }
  }

  ngOnInit(): void {
  }

}
