import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/interface/post';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.scss']
})
export class ContactPageComponent implements OnInit {

  post: Post = {email:'',name: '',surname:'',message:'',readStat: false};

  constructor(private postService: PostService) { }

  ngOnInit(): void {
  }

  sendPost(){
    this.postService.createPost(this.post);
    this.clear();
  }

  clear(){
    this.post = {email:'',name: '',surname:'',message:'',readStat: false};
  }

}
