import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";

import { BlogPostCreateRoutingModule } from './blog-post-create-routing.module';
import { BlogPostCreateComponent } from './blog-post-create.component';
import { HeaderModule } from 'src/app/header/header.module';
import { FooterModule } from 'src/app/footer/footer.module';

import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';



@NgModule({
  declarations: [BlogPostCreateComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BlogPostCreateRoutingModule,
    HeaderModule,
    FooterModule,
    AngularMaterialModule
  ]
})
export class BlogPostCreateModule { }
