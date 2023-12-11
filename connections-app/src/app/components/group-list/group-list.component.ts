import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectGroups } from 'src/app/redux/selectors/groups.selectors';
import { AuthService } from 'src/app/services/auth/auth.service';

import * as GroupsActions from '../../redux/actions/groups.actions';

@Component({
  selector: 'app-group-list',
  standalone: true,
  imports: [CommonModule, MatListModule, RouterModule, MatButtonModule],
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss'],
})
export class GroupListComponent {
  // list = [
  //   {
  //     id: '1',
  //     name: 'group1',
  //     createdAt: '01/01/2024',
  //     createdBy: 'User',
  //   },
  //   {
  //     id: '2',
  //     name: 'group2',
  //     createdAt: '01/01/2024',
  //     createdBy: 'User',
  //   },
  // ];

  $list = this.store.select(selectGroups);

  constructor(
    private store: Store,
    private authService: AuthService
  ) {}

  update() {
    const credentials = this.authService.getCredentials();
    this.store.dispatch(GroupsActions.getGroups(credentials));
  }
}
