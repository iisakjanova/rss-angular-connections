import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { catchError, of, switchMap } from 'rxjs';
import * as ConversationActions from 'src/app/redux/actions/conversations.actions';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ConversationService } from 'src/app/services/conversation/conversation.service';

export const conversationResolver: ResolveFn<boolean> = (
  route: ActivatedRouteSnapshot
) => {
  const conversationID = route.paramMap.get('conversationId');
  const conversationService = inject(ConversationService);
  const authService = inject(AuthService);
  const credentials = authService.getCredentials();

  const router = inject(Router);
  const store = inject(Store);

  if (!conversationID) {
    store.dispatch(ConversationActions.createConversation());
    return conversationService
      .createConversation(credentials.email, credentials.uid, credentials.token)
      .pipe(
        switchMap(response => {
          const newConversationID = response?.conversationID;

          if (newConversationID) {
            router.navigate(['/conversation/', newConversationID]);
            return of(true);
          }

          router.navigate(['/']);
          return of(false);
        }),
        catchError(() => {
          console.error('Error creating conversation');
          router.navigate(['/']);
          return of(false);
        })
      );
  }
  return of(true);
};
