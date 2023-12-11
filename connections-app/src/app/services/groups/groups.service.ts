import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SuccessGroupsResponse } from 'src/app/models/response.models';

@Injectable({
  providedIn: 'root',
})
export class GroupsService {
  private baseApiUrl = 'https://tasks.app.rs.school/angular/groups/';

  constructor(private http: HttpClient) {}

  getGroups(
    email: string,
    uid: string,
    token: string
  ): Observable<SuccessGroupsResponse> {
    const headers = new HttpHeaders({
      'rs-email': email,
      'rs-uid': uid,
      Authorization: `Bearer ${token}`,
    });

    const apiUrl = `${this.baseApiUrl}list`;
    const options = { headers };
    return this.http.get<SuccessGroupsResponse>(apiUrl, options);
  }
}
