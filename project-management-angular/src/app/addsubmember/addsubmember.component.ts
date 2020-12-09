import { Component, OnInit } from '@angular/core';
import { Member } from '../models/member.model';
import { DataService } from '../Services/data.service';
import { MemberService } from '../Services/member.service';
import { RoleService } from '../Services/role.service';

@Component({
  selector: 'app-addsubmember',
  templateUrl: './addsubmember.component.html',
  styleUrls: ['./addsubmember.component.css']
})
export class AddsubmemberComponent implements OnInit {

  constructor(
    private memberservice: MemberService,
    private roleservice: RoleService,
    private dataservice : DataService,
  ) { }

  member: Array<Member> = [];
  roles: Array<any> = [];
  valid: any = '';

  ngOnInit(): void {

    this.getMembers();
    this.getRoles();

  }

  async getRoles() {
    try {
      const data: any = await this.roleservice.sendGetRequest('/role');
      data.forEach(element => {
        this.roles.push(element);
      });
    } catch (error) {
      console.log('Error', error.error);
    }
  }

  async getMembers() {

    try {

      var respons: any = await this.memberservice.sendGetRequest('/member/all');

      respons.map((item) => {
        [

          this.member.push(new Member(item))

        ]
      })

    } catch (error) {

      console.log('Error', error.error);

    }

  }

  onAddSubMem(submember) {

    if (!submember.valid) {
      return false;
    }

    try {

      if (submember.value.password !== submember.value.cpassword) {
          throw new Error('Password must be same');
      }

      var requiredFiled : Array<any> = ['name','phone','email','role','password'];
      this.dataservice.validateForm(submember.value,requiredFiled);

      this.memberservice.sendPostRequest('/member/sub/signup', submember.value)
        .then((response: any) => {
          console.log('Success', response);
          localStorage.setItem('token', response.token);
          this.member.push(response);
          submember.resetForm();
          this.valid = '';
        })
        .catch((error) => {
          console.log('Error', error.error);
        })
    } catch (error) {
      this.valid = error.message;
      console.log('Error', error.message);
    }

  }
}
