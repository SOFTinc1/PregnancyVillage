import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { BlogService } from 'src/app/shared/services/blog.service';
import { CommentService } from 'src/app/shared/services/comment.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  comment: Comment;
  isLoading = false;
  form: FormGroup;
  private postId: string;
  private authStatusSub: Subscription;
  userId: string;
  userIsAuthenticated = false;

  constructor(
    public postsService: BlogService,
    public commentService: CommentService,
    public route: ActivatedRoute,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.postId = paramMap.get("postId");
    });


    this.userId = this.authService.getUserId();

    this.form = new FormGroup({
      content: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
    });

  }

  onCreateComment() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    this.commentService.addComment(
      this.form.value.content,
      this.postId
    );
    this.form.reset();
  }

  // ngOnDestroy() {
  //   this.authStatusSub.unsubscribe();
  // }

}
