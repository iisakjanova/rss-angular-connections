import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { catchError, Observable, of, switchMap, take, tap } from 'rxjs';
import { SuccessConversationsResponse } from 'src/app/models/response.models';
import * as ConversationsActions from 'src/app/redux/actions/conversations.actions';
import { selectCompanionId } from 'src/app/redux/selectors/people.selectors';

@Injectable({
  providedIn: 'root',
})
export class ConversationService {
  private baseApiUrl = 'https://tasks.app.rs.school/angular/conversations/';

  companionID$ = this.store.select(selectCompanionId);

  constructor(
    private store: Store,
    private http: HttpClient
  ) {}

  getConversations(
    email: string,
    uid: string,
    token: string
  ): Observable<SuccessConversationsResponse> {
    const headers = new HttpHeaders({
      'rs-email': email,
      'rs-uid': uid,
      Authorization: `Bearer ${token}`,
    });

    const apiUrl = `${this.baseApiUrl}list`;
    const options = { headers };
    return this.http.get<SuccessConversationsResponse>(apiUrl, options);
  }

  createConversation(
    email: string,
    uid: string,
    token: string
  ): Observable<{ conversationID: string }> {
    let companion: string;

    return this.companionID$.pipe(
      take(1),
      tap(companionValue => {
        companion = companionValue;
      }),
      switchMap(() => {
        const headers = new HttpHeaders({
          'rs-email': email,
          'rs-uid': uid,
          Authorization: `Bearer ${token}`,
        });
        const apiUrl = `${this.baseApiUrl}create`;
        const requestBody = { companion };
        const options = { headers };

        return this.http.post<{ conversationID: string }>(
          apiUrl,
          requestBody,
          options
        );
      }),
      switchMap(response => {
        this.store.dispatch(
          ConversationsActions.createConversationSuccess({
            response,
            companion,
          })
        );
        return of(response);
      }),
      catchError(error => {
        this.store.dispatch(
          ConversationsActions.createConversationFailure(error)
        );
        return of(error);
      })
    );
  }
}
