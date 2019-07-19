import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './auth/auth-guard.guard';
import { ExternalApiComponent } from './external-api/external-api.component';

// TODO: make loadChildren use dynamic layout once angular fixes AOT with it.
const routes: Routes = [
  {
    path: 'auth',
    // loadChildren: () => import('./auth/auth.module').then(mod => mod.AuthModule),
    loadChildren: './auth/auth.module#AuthModule',
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'external-api',
    component: ExternalApiComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'users',
    loadChildren: './users/users.module#UsersModule',
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
