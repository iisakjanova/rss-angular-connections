import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRouteSnapshot, ResolveFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { catchError, of, switchMap } from 'rxjs';
import { Group } from 'src/app/models/response.models';
import * as GroupsActions from 'src/app/redux/actions/groups.actions';
import { selectGroups } from 'src/app/redux/selectors/groups.selectors';
import { GroupItem } from 'src/app/redux/state/groups.state';
import { AuthService } from 'src/app/services/auth/auth.service';
import { GroupsService } from 'src/app/services/groups/groups.service';

export const groupExistsResolver: ResolveFn<boolean> = (
  route: ActivatedRouteSnapshot
) => {
  const groupId = route.paramMap.get('groupID');
  const router = inject(Router);
  const store = inject(Store);
  const snackBar = inject(MatSnackBar);

  const groups$ = store.select(selectGroups);

  const authService = inject(AuthService);
  const credentials = authService.getCredentials();
  const groupsService = inject(GroupsService);

  return groups$.pipe(
    switchMap(groups => {
      if (groups.length === 0) {
        return groupsService
          .getGroups(credentials.email, credentials.token, credentials.uid)
          .pipe(
            switchMap(response => {
              // Dispatch success action with the response
              store.dispatch(GroupsActions.getGroupsSuccess({ response }));
              return of(response);
            }),
            catchError(error => {
              // Dispatch failure action with the error
              store.dispatch(GroupsActions.getGroupsFailure({ error }));
              return error;
            })
          );
      }
      return of(groups);
    }),
    switchMap(groups => {
      let group: GroupItem | Group | undefined;

      if (Array.isArray(groups)) {
        group = (groups as GroupItem[]).find(item => item.id === groupId);
      } else {
        group = (groups as { Items: Group[] }).Items.find(
          item => item.id.S === groupId
        );
      }

      if (group) {
        return of(true);
      }
      snackBar.open(`This group doesn't exist!`, 'Close', {
        duration: 5000,
        panelClass: ['error-snackbar'],
      });
      router.navigate(['/']);
      return of(false);
    })
  );
};
