import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SuccessProfileResponse } from 'src/app/models/response.models';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private apiUrl = 'https://tasks.app.rs.school/angular/profile';

  constructor(private http: HttpClient) {}

  getProfile(
    email: string,
    uid: string,
    token: string
  ): Observable<SuccessProfileResponse> {
    const headers = new HttpHeaders({
      'rs-email': email,
      'rs-uid': uid,
      Authorization: `Bearer ${token}`,
    });

    const options = { headers };
    return this.http.get<SuccessProfileResponse>(this.apiUrl, options);
  }

  updateProfile(
    email: string,
    uid: string,
    token: string,
    name: string
  ): Observable<SuccessProfileResponse> {
    const headers = new HttpHeaders({
      'rs-email': email,
      'rs-uid': uid,
      Authorization: `Bearer ${token}`,
    });

    const requestBody = { name };
    const options = { headers };
    return this.http.put<SuccessProfileResponse>(
      this.apiUrl,
      requestBody,
      options
    );
  }
}
