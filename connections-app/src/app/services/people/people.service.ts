import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SuccessPeopleResponse } from 'src/app/models/response.models';

@Injectable({
  providedIn: 'root',
})
export class PeopleService {
  private apiUrl = 'https://tasks.app.rs.school/angular/users';

  constructor(private http: HttpClient) {}

  getPeople(
    email: string,
    uid: string,
    token: string
  ): Observable<SuccessPeopleResponse> {
    const headers = new HttpHeaders({
      'rs-email': email,
      'rs-uid': uid,
      Authorization: `Bearer ${token}`,
    });

    const options = { headers };
    return this.http.get<SuccessPeopleResponse>(this.apiUrl, options);
  }
}
