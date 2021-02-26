import { Component, OnDestroy, OnInit } from '@angular/core';
import { Blog } from "../shared/interface/blog.model";
import { Subscription } from 'rxjs';
import { AuthService } from '../shared/services/auth.service'
import { BlogService } from '../shared/services/blog.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  posts: Blog[] = [];
  isLoading = false;
  totalPosts = 0;
  postsPerPage = 2;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];
  userIsAuthenticated = false;
  userId: string;
  userName: string;
  image: string;
  private postsSub: Subscription;
  private authStatusSub: Subscription;
  private authListenerSubs: Subscription;


  constructor(public blogService: BlogService, private authService: AuthService) {}

  ngOnInit() {

    this.isLoading = true;
    this.blogService.getPosts(this.postsPerPage, this.currentPage);
    this.userId = this.authService.getUserId();
    this.postsSub = this.blogService
      .getPostUpdateListener()
      .subscribe((postData: { posts: Blog[]; postCount: number }) => {
        this.isLoading = false;
        this.totalPosts = postData.postCount;
        this.posts = postData.posts;
      });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
      });
    this.userName = this.authService.getUserName();
    this.image = this.authService.getImage();
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.blogService.getPosts(this.postsPerPage, this.currentPage);
  }

  onLogout() {
    this.authService.logout();
  }

}
