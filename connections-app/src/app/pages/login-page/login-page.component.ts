import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LoginComponent } from 'src/app/components/login/login.component';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, LoginComponent],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {}
