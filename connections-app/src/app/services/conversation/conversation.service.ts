import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, switchMap } from 'rxjs';
import { SuccessConversationsResponse } from 'src/app/models/response.models';
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
    return this.companionID$.pipe(
      switchMap(companion => {
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
      })
    );
  }
}
