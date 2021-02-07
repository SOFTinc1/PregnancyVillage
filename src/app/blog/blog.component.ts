import { Component, OnDestroy, OnInit } from '@angular/core';
import { Blog } from "../shared/interface/blog.model";
import { Subscription } from 'rxjs';
import { AuthService } from '../shared/services/auth.service'
import { BlogService } from '../shared/services/blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit, OnDestroy {

  posts: Blog[] = [];
  isLoading = false;
  totalPosts = 0;
  totalRecords;
  page: Number = 1;
  // postsPerPage = 2;
  // currentPage = 1;
  // pageSizeOptions = [1, 2, 5, 10];
  userIsAuthenticated = false;
  userId: string;
  private postsSub: Subscription;
  private authStatusSub: Subscription;
  private authListenerSubs: Subscription;
  username: string;


  constructor(public blogService: BlogService, private authService: AuthService) {}

  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });

    this.isLoading = true;
    this.totalRecords = this.blogService.getPosts();
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

    // this.username = this.authService.login().userName;
  }


  onLogout() {
    this.authService.logout();
  }


  ngOnDestroy() {
    this.postsSub.unsubscribe();
    this.authStatusSub.unsubscribe();
    this.authListenerSubs.unsubscribe();
  }

}
