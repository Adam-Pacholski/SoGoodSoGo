import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/interface/post';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {

  postList:Post[] = [];

  constructor(private postService: PostService) {
    this.getPosts();
   }

  ngOnInit(): void {
  }

  getPosts(){
    this.postService.getPost().subscribe(items => {
      this.postList = items;
    })
  }

  read(i: number){
    this.postService.changeReadStat(this.postList[i]);
  }

}
