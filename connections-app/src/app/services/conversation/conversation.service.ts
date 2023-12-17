import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of, switchMap, tap } from 'rxjs';
import { selectCompanionId } from 'src/app/redux/selectors/people.selectors';

@Injectable({
  providedIn: 'root',
})
export class ConversationService {
  companionID$ = this.store.select(selectCompanionId);

  constructor(private store: Store) {}

  createConversation(): Observable<{ conversationID: string }> {
    return this.companionID$.pipe(
      tap(companionID => {
        console.log('Companion ID:', companionID);
      }),
      switchMap(() => of({ conversationID: '' }))
    );
  }
}
