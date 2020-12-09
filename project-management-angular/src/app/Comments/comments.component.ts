import { Component, OnInit } from '@angular/core';

//importing module
import { ActivatedRoute } from '@angular/router';
import { CommentsService } from '../Services/comments.service';
import { DataService } from '../Services/data.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  constructor(
    private router : ActivatedRoute,
    private commentservice : CommentsService,
    private dataservice : DataService,
  ) { 
    this.getComments();
  }

  ngOnInit(): void {
  }

  mycomments : Array<any> = [];
  header = {
    Authorization : localStorage.getItem('token')
  };
  _error : any = '';

  async getComments()
  {
    try {
      const data : any = await this.commentservice.sendGetRequest('/comment',this.router.snapshot.params['id']);
      data.forEach(element => {
        this.mycomments.push(element);
      });
    } catch (error) {
      console.log('Error',error.error);
    }
  }

  async onComment(comments)
  {
    if(!comments.valid)
    {
      return false;
    }

    try
    {
      var requiredFields : Array<any> = ['comment'];

      comments.value.fromtodo = this.router.snapshot.params['id'];
      this.dataservice.validateForm(comments.value,requiredFields);
      const data = await this.commentservice.sendPostRequest('/comment/todo',comments.value);
      console.log('Success',data);
      comments.resetForm();
      this.mycomments.push(data);
      this._error = '';
    }
    catch (error)
    {
      this._error = error.message
      console.log('Error',error.message);
    }
  }

}