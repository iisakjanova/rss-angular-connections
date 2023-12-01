import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RegistrationComponent } from 'src/app/components/registration/registration.component';

@Component({
  selector: 'app-registration-page',
  standalone: true,
  imports: [CommonModule, RegistrationComponent],
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss'],
})
export class RegistrationPageComponent {}
