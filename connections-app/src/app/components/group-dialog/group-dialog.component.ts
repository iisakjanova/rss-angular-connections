import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of, Subscription, switchMap, take } from 'rxjs';
import {
  selectGroupById,
  selectGroupsError,
  selectGroupsLoading,
} from 'src/app/redux/selectors/groups.selectors';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CountdownService } from 'src/app/services/countdown/countdown.service';
import { DeleteModalService } from 'src/app/services/delete-modal/delete-modal.service';

@Component({
  selector: 'app-group-dialog',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './group-dialog.component.html',
  styleUrls: ['./group-dialog.component.scss'],
})
export class GroupDialogComponent {
  countdown$ = this.countdownService.groupDialogCountdown$;

  loading$ = this.store.select(selectGroupsLoading);

  error$ = this.store.select(selectGroupsError);

  private errorSubscription: Subscription | undefined;

  private credentials;

  groupId!: string;

  isCurrentUser$: Observable<boolean>;

  constructor(
    private countdownService: CountdownService,
    private store: Store,
    private authService: AuthService,
    private route: ActivatedRoute,
    private deleteModalService: DeleteModalService
  ) {
    this.credentials = this.authService.getCredentials();
    this.route.params.subscribe(params => {
      this.groupId = params['groupID'];
    });

    this.isCurrentUser$ = this.isCurrentUser();
  }

  get group$() {
    return this.store.select(selectGroupById(this.groupId));
  }

  update() {
    if (this.errorSubscription) {
      this.errorSubscription.unsubscribe();
      this.errorSubscription = undefined;
    }

    // Subscribe to the new error$ observable
    this.errorSubscription = this.error$.subscribe(error => {
      if (!error) {
        this.countdownService.startGroupDialogCountdown();
      } else {
        this.countdownService.stopGroupDialogCountdown();
        this.countdownService.resetGroupDialogCountdown();
      }
    });
  }

  // eslint-disable-next-line class-methods-use-this
  isButtonDisabled(
    loading: boolean | null,
    countdownValue: number | null
  ): boolean {
    // If loading is null, treat it as false
    const isLoading = loading !== null ? loading : false;
    // If countdownValue is null, treat it as 0
    const countdown = countdownValue !== null ? countdownValue : 0;

    return isLoading || (countdown < 60 && countdown !== 0);
  }

  isCurrentUser(): Observable<boolean> {
    return this.group$.pipe(
      take(1),
      switchMap(group => {
        const createdBy = group?.createdBy || '';
        return of(this.credentials.uid === createdBy);
      })
    );
  }

  onDeleteButtonClick() {
    this.deleteModalService.openDialog(this.groupId);
  }
}
