import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, Router } from '@angular/router';
import { catchError, of, switchMap } from 'rxjs';
import { ConversationService } from 'src/app/services/conversation/conversation.service';

export const conversationResolver: ResolveFn<boolean> = (
  route: ActivatedRouteSnapshot
) => {
  const conversationID = route.paramMap.get('conversationId');
  const conversationService = inject(ConversationService);

  const router = inject(Router);

  if (!conversationID) {
    return conversationService.createConversation().pipe(
      switchMap(response => {
        const newConversationID = response?.conversationID;

        if (newConversationID) {
          router.navigate(['/conversation/', newConversationID]);
          return of(true);
        }
        console.error('Invalid response format');
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
