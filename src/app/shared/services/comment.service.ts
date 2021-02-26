import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable, Subject } from 'rxjs';
import { map } from "rxjs/operators";

import { environment } from "../../../environments/environment";

import { Comment } from '../interface/comment';

const url = environment.apiUrl + "/posts/";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private comments: Comment[] = [];
  private commentsUpdated = new Subject<{ comments: Comment[]; commentCount: number }>();

  constructor(private http: HttpClient, private router: Router) { }


  getCommentUpdateListener() {
    return this.commentsUpdated.asObservable();
  }

  addComment(content: string, postId: string) {
    const commentData = new FormData();
    commentData.append("content", content);
    // const commentData = {content, postId}
    this.http
      .post<{ message: string; comment: Comment }>(
        "http://localhost:3200/api/comment",
        commentData
      )
      .subscribe(responseData => {
        this.router.navigate(['/blog']);
      });
  }

  // updatePost(id: string, title: string, content: string, image: File | string) {
  //   let postData: Blog | FormData;
  //   if (typeof image === "object") {
  //     postData = new FormData();
  //     postData.append("id", id);
  //     postData.append("title", title);
  //     postData.append("content", content);
  //     postData.append("image", image, title);
  //   } else {
  //     postData = {
  //       id: id,
  //       title: title,
  //       content: content,
  //       imagePath: image,
  //       creator: null
  //     };
  //   }
  //   this.http
  //     .put(url + id, postData)
  //     .subscribe(response => {
  //       this.router.navigate(['/show', id]);
  //     });
  // }


  // deletePost(postId: string) {
  //   return this.http.delete(url + postId);
  // }

}
