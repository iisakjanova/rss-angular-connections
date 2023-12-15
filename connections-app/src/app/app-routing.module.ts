import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { authGuard } from './guards/auth/auth.guard';
import { nonAuthGuard } from './guards/non-auth/non-auth.guard';
import { GroupDialogPageComponent } from './pages/group-dialog-page/group-dialog-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { RegistrationPageComponent } from './pages/registration-page/registration-page.component';

const routes: Routes = [
  {
    path: 'signup',
    component: RegistrationPageComponent,
    canActivate: [nonAuthGuard],
  },
  {
    path: 'signin',
    component: LoginPageComponent,
    canActivate: [nonAuthGuard],
  },
  {
    path: 'profile',
    component: ProfilePageComponent,
    canActivate: [authGuard],
  },
  {
    path: '',
    pathMatch: 'full',
    component: MainPageComponent,
    canActivate: [authGuard],
  },
  {
    path: 'group/:groupID',
    component: GroupDialogPageComponent,
    canActivate: [authGuard],
  },
  { path: '**', component: NotFoundPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
