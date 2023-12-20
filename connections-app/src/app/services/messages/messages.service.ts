import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, switchMap, take } from 'rxjs';
import { SuccessMessagesResponse } from 'src/app/models/response.models';
import { selectTimestamp } from 'src/app/redux/selectors/messages.selectors';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  private baseApiUrl = 'https://tasks.app.rs.school/angular/groups/';

  constructor(
    private http: HttpClient,
    private store: Store
  ) {}

  getMessages(
    email: string,
    uid: string,
    token: string,
    groupID: string
  ): Observable<SuccessMessagesResponse> {
    const headers = new HttpHeaders({
      'rs-email': email,
      'rs-uid': uid,
      Authorization: `Bearer ${token}`,
    });

    const apiUrl = `${this.baseApiUrl}read?groupID=${groupID}`;
    const options = { headers };
    const timestamp$ = this.store
      .select(selectTimestamp(groupID))
      .pipe(take(1));

    return timestamp$.pipe(
      switchMap(timestamp => {
        const apiUrlWithTimestamp = `${apiUrl}&since=${timestamp}`;
        return this.http.get<SuccessMessagesResponse>(
          apiUrlWithTimestamp,
          options
        );
      })
    );
  }
}
