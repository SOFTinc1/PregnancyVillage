// import { Component, OnDestroy, OnInit } from '@angular/core';
// import { FormGroup, NgForm } from '@angular/forms';
// import { Subscription } from 'rxjs';
// import { AuthService } from 'src/app/shared/services/auth.service';

// @Component({
//   selector: 'app-register',
//   templateUrl: './register.component.html',
//   styleUrls: ['./register.component.scss']
// })
// export class RegisterComponent implements OnInit, OnDestroy {

//   isLoading = false;
//   private authStatusSub: Subscription;



//   constructor(public authService: AuthService) { }

//   ngOnInit(): void {
//     this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
//       authStatus => {
//         this.isLoading = false;
//       }
//     );
//   }

//   onSignup(form: NgForm) {
//     if (form.invalid) {
//       return;
//     }
//     this.isLoading = true;
//     this.authService.createUser(form.value.fullname, form.value.phone, form.value.email, form.value.password);
//   }



//   ngOnDestroy() {
//     this.authStatusSub.unsubscribe();
//   }

// }


import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
// import { Blog } from 'src/app/shared/interface/blog.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { mimeType } from "../../blog/blog-post-create/mime-type.validator";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

  // post: Blog;
  // private userId: string;
  isLoading = false;
  form: FormGroup;
  imagePreview: string;
  private authStatusSub: Subscription;
  userIsAuthenticated = false;

  constructor(
    public route: ActivatedRoute,
    private authService: AuthService) {}

  ngOnInit(): void {

    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(authStatus => {
        this.isLoading = false;
      });

    // this.userId = this.authService.getUserId();

    this.form = new FormGroup({
      fullname: new FormControl(null, { validators: [Validators.required, Validators.minLength(3)] }),
      phone: new FormControl(null, { validators: [Validators.required] }),
      email: new FormControl(null, { validators: [Validators.required] }),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      }),
      password: new FormControl(null, { validators: [Validators.required] })
    });

  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get("image").updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onRegister() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService.createUser(
      this.form.value.fullname,
      this.form.value.phone,
      this.form.value.email,
      this.form.value.image,
      this.form.value.password
    );
    this.form.reset();
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }

}
