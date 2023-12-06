import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UserInfoComponent } from 'src/app/components/user-info/user-info.component';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [CommonModule, UserInfoComponent],
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent {}
