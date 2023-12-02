import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import {
  ApiResponse,
  SuccessRegistrationResponse,
} from '../models/response.models';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  private apiUrl = 'https://tasks.app.rs.school/angular/registration';

  constructor(private http: HttpClient) {}

  registerUser(
    email: string,
    name: string,
    password: string
  ): Observable<ApiResponse<SuccessRegistrationResponse>> {
    const requestBody = { email, name, password };
    return this.http.post<ApiResponse<SuccessRegistrationResponse>>(
      this.apiUrl,
      requestBody
    );
  }
}
