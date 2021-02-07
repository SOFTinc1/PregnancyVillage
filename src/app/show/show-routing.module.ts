import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../shared/guards/auth-guard.guard';
import { ShowComponent } from './show.component';

const routes: Routes = [
  {
    path: '',
    component: ShowComponent
  },
  {
    path: 'edit/:postId',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./edit/edit.module')
            .then(m => m.EditModule)
      }
    ],
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShowRoutingModule { }
