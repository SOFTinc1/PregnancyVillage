import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable, Subject } from 'rxjs';
import { map } from "rxjs/operators";

import { environment } from "../../../environments/environment";

import { Blog } from '../interface/blog.model';
import { Comment } from '../interface/comment';

// const url = environment.apiUrl + "/posts/";

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private posts: Blog[] = [];
  comments: Comment[] = [];
  private postsUpdated = new Subject<{ posts: Blog[]; postCount: number }>();

  constructor(private http: HttpClient, private router: Router) { }


  getPosts(postsPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;
    this.http
      .get<{ message: string; posts: Blog[]; maxPosts: number }>(
        url + queryParams
      )
      .pipe(
        map(postData => {
          return {
            posts: postData.posts.map(post => {
              return {
                title: post.title,
                content: post.content,
                id: post._id,
                imagePath: post.imagePath,
                creator: post.creator
              };
            }),
            maxPosts: postData.maxPosts
          };
        })
      )
      .subscribe(transformedPostData => {
        this.posts = transformedPostData.posts;
        this.postsUpdated.next({
          posts: [...this.posts],
          postCount: transformedPostData.maxPosts
        });
      });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  getPost(id: string) {
    return this.http.get<{ post: Blog, comments: Comment[] }>(url + id);
    // return this.http.get<{
    //   _id: string;
    //   title: string;
    //   content: string;
    //   imagePath: string;
    //   creator: string;
    //   comment: Comment
    // }>(url + id);
  }

  addPost(title: string, content: string, image: File) {
    const postData = new FormData();
    postData.append("title", title);
    postData.append("content", content);
    postData.append("image", image, title);
    this.http
      .post<{ message: string; post: Blog }>(
        "http://localhost:3200/api/posts",
        postData
      )
      .subscribe(responseData => {
        this.router.navigate(["/blog"]);
      });
  }

  updatePost(id: string, title: string, content: string, image: File | string) {
    let postData: Blog | FormData;
    if (typeof image === "object") {
      postData = new FormData();
      postData.append("id", id);
      postData.append("title", title);
      postData.append("content", content);
      postData.append("image", image, title);
    } else {
      postData = {
        id: id,
        title: title,
        content: content,
        imagePath: image,
        creator: null
      };
    }
    this.http
      .put(url + id, postData)
      .subscribe(response => {
        this.router.navigate(['/show', id]);
      });
  }


  deletePost(postId: string) {
    return this.http.delete(url + postId);
  }

}
