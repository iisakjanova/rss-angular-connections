import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-group-list',
  standalone: true,
  imports: [CommonModule, MatListModule, RouterModule],
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss'],
})
export class GroupListComponent {
  list = [
    {
      id: '1',
      name: 'group1',
      createdAt: '01/01/2024',
      createdBy: 'User',
    },
    {
      id: '2',
      name: 'group2',
      createdAt: '01/01/2024',
      createdBy: 'User',
    },
  ];
}
