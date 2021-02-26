import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { CustomSnackbarService } from './custom-snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor() { }

  // public handleError (error: HttpErrorResponse | any) {
  //   CustomSnackbarService.openSnackBar(error, 'error')
  //   return throwError(error);
  // }
}
