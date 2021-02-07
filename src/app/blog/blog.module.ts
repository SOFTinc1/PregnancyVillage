import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import { BlogComponent } from './blog.component';
import { HeaderModule } from '../header/header.module';
import { FooterModule } from '../footer/footer.module';

import { AngularMaterialModule } from '../angular-material/angular-material.module';

@NgModule({
  declarations: [BlogComponent],
  imports: [
    CommonModule,
    BlogRoutingModule,
    HeaderModule,
    FooterModule,
    AngularMaterialModule
  ]
})
export class BlogModule { }
