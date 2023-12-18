import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ConversationPageComponent } from './components/conversation-page/conversation-page.component';
import { AuthGuard } from './guards/auth/auth.guard';
import { NonAuthGuard } from './guards/non-auth/non-auth.guard';
import { GroupDialogPageComponent } from './pages/group-dialog-page/group-dialog-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { RegistrationPageComponent } from './pages/registration-page/registration-page.component';
import { conversationResolver } from './resolvers/conversation/conversation.resolver';

const routes: Routes = [
  {
    path: 'signup',
    component: RegistrationPageComponent,
    canActivate: [NonAuthGuard],
  },
  {
    path: 'signin',
    component: LoginPageComponent,
    canActivate: [NonAuthGuard],
  },
  {
    path: 'profile',
    component: ProfilePageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '',
    pathMatch: 'full',
    component: MainPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'group/:groupID',
    component: GroupDialogPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'conversation/:conversationId',
    component: ConversationPageComponent,
    resolve: {
      conversationExists: conversationResolver,
    },
  },
  { path: '**', component: NotFoundPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
