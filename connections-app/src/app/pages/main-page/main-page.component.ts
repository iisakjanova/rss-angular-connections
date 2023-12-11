import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { GroupListComponent } from 'src/app/components/group-list/group-list.component';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [CommonModule, GroupListComponent],
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent {}
