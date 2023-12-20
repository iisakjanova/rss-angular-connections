import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SuccessMessagesResponse } from 'src/app/models/response.models';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  private baseApiUrl = 'https://tasks.app.rs.school/angular/groups/';

  constructor(private http: HttpClient) {}

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
    return this.http.get<SuccessMessagesResponse>(apiUrl, options);
  }
}
