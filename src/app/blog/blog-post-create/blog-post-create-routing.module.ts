import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlogPostCreateComponent } from './blog-post-create.component';

const routes: Routes = [
  {
    path: '',
    component: BlogPostCreateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogPostCreateRoutingModule { }
