import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

  isLoading = false;
  private authStatusSub: Subscription;


  constructor(public authService: AuthService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
      authStatus => {
        this.isLoading = false;
      }
    );
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  onSignup(form: NgForm) {
    if (form.invalid) {
      return;
    }
    else if (form.value.password === form.value.passwordCheck){
      this.isLoading = true;
      this.authService.createUser(form.value.fullname, form.value.phone, form.value.email, form.value.password);
      this.openSnackBar('registration successful', 'enter');
    }
    return;
  }



  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }

}
