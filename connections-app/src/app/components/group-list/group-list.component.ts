import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
export class GroupListComponent implements OnInit {
  $list = this.store.select(selectGroups);

  constructor(
    private store: Store,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.$list.subscribe(list => {
      if (list.length === 0) {
        this.update();
      }
    });
  }

  update() {
    const credentials = this.authService.getCredentials();
    this.store.dispatch(GroupsActions.getGroups(credentials));
  }
}
