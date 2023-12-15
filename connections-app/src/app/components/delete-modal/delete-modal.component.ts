import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import * as GroupsActions from 'src/app/redux/actions/groups.actions';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DeleteModalService } from 'src/app/services/delete-modal/delete-modal.service';

@Component({
  selector: 'app-delete-modal',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogModule],
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss'],
})
export class DeleteModalComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteModalComponent>,
    private store: Store,
    private authService: AuthService,
    private deleteModalService: DeleteModalService,
    @Inject(MAT_DIALOG_DATA) public data: { id: string }
  ) {}

  onCancelClick(): void {
    this.deleteModalService.closeDialog();
  }

  onSubmitClick(): void {
    const credentials = this.authService.getCredentials();
    const params = { ...credentials, groupID: this.data.id };
    this.store.dispatch(GroupsActions.deleteGroup(params));
  }
}
