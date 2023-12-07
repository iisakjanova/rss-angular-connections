import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  token!: string;

  email!: string;

  uid!: string;

  public getCredentials() {
    this.token = localStorage.getItem('token') || '';
    this.email = localStorage.getItem('email') || '';
    this.uid = localStorage.getItem('uid') || '';

    return { token: this.token, email: this.email, uid: this.uid };
  }
}
