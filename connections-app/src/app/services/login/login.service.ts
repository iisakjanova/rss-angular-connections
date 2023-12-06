import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SuccessLoginResponse } from 'src/app/models/response.models';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl = 'https://tasks.app.rs.school/angular/login';

  constructor(private http: HttpClient) {}

  loginUser(email: string, password: string): Observable<SuccessLoginResponse> {
    const requestBody = { email, password };
    return this.http.post<SuccessLoginResponse>(this.apiUrl, requestBody);
  }
}
