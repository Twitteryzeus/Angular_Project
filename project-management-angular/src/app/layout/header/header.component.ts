import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MemberService } from 'src/app/Services/member.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private memberservice : MemberService,
    private route : Router
  ) {
    this.getMember();
   }

  header = {
    Authorization : localStorage.getItem('token')
  }

  member : any = '';

  async getMember(){

    try {
      const data =   await this.memberservice.sendGetRequest('/member');
      this.member = data;
    } catch (error) {
      console.log('Error',error.error);
    }
  }

  async onLogoutMember(){
    try
    {
      const data = await this.memberservice.sendGetRequest('/member/logout');
      console.log('Success',data);
      localStorage.removeItem('token');
      this.route.navigateByUrl('/login');
    }
    catch(error){
      console.log('Error',error.error);
    }
  }

  ngOnInit(): void {
  }

}
