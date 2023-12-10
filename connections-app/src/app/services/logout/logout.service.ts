import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SuccessLogoutResponse } from 'src/app/models/response.models';

@Injectable({
  providedIn: 'root',
})
export class LogoutService {
  private apiUrl = 'https://tasks.app.rs.school/angular/logout';

  constructor(private http: HttpClient) {}

  logoutUser(
    email: string,
    uid: string,
    token: string
  ): Observable<SuccessLogoutResponse> {
    const headers = new HttpHeaders({
      'rs-email': email,
      'rs-uid': uid,
      Authorization: `Bearer ${token}`,
    });

    const options = { headers };
    return this.http.delete<SuccessLogoutResponse>(this.apiUrl, options);
  }
}
