import { HttpClientModule } from '@angular/common/http';
import { isDevMode, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { CreateConversationEffects } from './redux/effects/create-conversation.effects';
import { CreateGroupEffects } from './redux/effects/create-group.effects';
import { DeleteGroupEffects } from './redux/effects/delete-group.effects';
import { GetConversationsEffects } from './redux/effects/get-conversations.effects';
import { GetGroupsEffects } from './redux/effects/get-groups.effects';
import { GetMessagesEffects } from './redux/effects/get-messages.effects';
import { GetPeopleEffects } from './redux/effects/get-people.effects';
import { GetProfileEffects } from './redux/effects/get-profile.effects';
import { LoginEffects } from './redux/effects/login.effects';
import { LogoutEffects } from './redux/effects/logout.effects';
import { RegistrationEffects } from './redux/effects/registration.effects';
import { UpdateProfileEffects } from './redux/effects/update-profile.effects';
import { appReducer } from './redux/reducers/app.reducer';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatSnackBarModule,
    MatIconModule,
    HttpClientModule,
    MatDialogModule,
    HeaderComponent,
    StoreModule.forRoot(appReducer, {}),
    EffectsModule.forRoot([
      RegistrationEffects,
      LoginEffects,
      GetProfileEffects,
      UpdateProfileEffects,
      LogoutEffects,
      GetGroupsEffects,
      CreateGroupEffects,
      DeleteGroupEffects,
      GetPeopleEffects,
      GetConversationsEffects,
      CreateConversationEffects,
      GetMessagesEffects,
    ]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
