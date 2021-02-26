import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CommentRoutingModule } from './comment-routing.module';
import { CommentComponent } from './comment.component';
import { HeaderModule } from 'src/app/header/header.module';
import { FooterModule } from 'src/app/footer/footer.module';
import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';


@NgModule({
  declarations: [CommentComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CommentRoutingModule,
    HeaderModule,
    FooterModule,
    AngularMaterialModule
  ]
})
export class CommentModule { }
