import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../shared/services/auth.service';
import { BlogService } from '../shared/services/blog.service';
import { CommentService } from '../shared/services/comment.service';

import { Comment } from '../shared/interface/comment';
import { Blog } from '../shared/interface/blog.model';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {

  comments: Comment[] = [];
  totalComments = 0;
  commentsPerPage = 2;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];
  commentId: string;

  post: Blog;
  isLoading = false;
  postId: string;
  userIsAuthenticated = false;
  userId: string;
  private postsSub: Subscription;
  private authStatusSub: Subscription;
  private commentsSub: Subscription;

  constructor (
    private postService: BlogService,
    private router: Router,
    private route:  ActivatedRoute,
    private authService: AuthService,
    private commentService: CommentService,
  ) { }

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
      });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.postId = paramMap.get("postId");
      this.postService.getPost(this.postId).subscribe(postData => {
        this.post = postData.post;
        this.comments = postData.comments;
      })
    });

    // this.commentService.getComments(this.commentsPerPage, this.currentPage);
    // this.userId = this.authService.getUserId();
    // this.commentsSub = this.commentService
    //   .getCommentUpdateListener()
    //   .subscribe((commentData: { comments: Comment[]; commentCount: number }) => {
    //     this.isLoading = false;
    //     this.totalComments = commentData.commentCount;
    //     this.comments = commentData.comments;
    //   });


  }

  onDelete(postId: string) {
    this.isLoading = true;
    this.postService.deletePost(postId).subscribe(() => {
    }, () => {
      this.isLoading = false;
    });
    this.router.navigate(["/blog"]);
  }

  // onChangedPage(pageData: PageEvent) {
  //   this.isLoading = true;
  //   this.currentPage = pageData.pageIndex + 1;
  //   this.commentsPerPage = pageData.pageSize;
  //   this.commentService.getComments(this.commentsPerPage, this.currentPage);
  // }

}
