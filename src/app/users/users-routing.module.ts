import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from 'src/app/users/list/list.component';
import { NewComponent } from 'src/app/users/new/new.component';

const routes: Routes = [
  {
    path: 'new',
    component: NewComponent
  },
  {
    path: '**',
    component: ListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {}
