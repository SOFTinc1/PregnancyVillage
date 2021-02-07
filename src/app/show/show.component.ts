import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { Blog } from '../shared/interface/blog.model';
import { BlogService } from '../shared/services/blog.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {

  post: Blog;
  isLoading = false;
  private postsSub: Subscription;
  private postId: string;

  constructor(public postService: BlogService, public route:  ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.postId = paramMap.get("postId");
      this.postService.getPost(this.postId).subscribe(postData => {
        this.post = {
          id: postData._id,
          title: postData.title,
          content: postData.content,
          imagePath: postData.content,
          creator: postData.creator
        };
       // console.log(postData);
        console.log(postData);

        // this.userId = jobData.creator._id
      })
      // this.postService.getPostEdit(this.postId);
    });
  }

  onDelete(postId: string) {
    this.isLoading = true;
    this.postService.deletePost(postId).subscribe(() => {
      // this.postsService.getPosts(this.postsPerPage, this.currentPage);
    }, () => {
      this.isLoading = false;
    });
  }

}
