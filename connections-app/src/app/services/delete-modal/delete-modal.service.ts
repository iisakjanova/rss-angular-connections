import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DeleteModalComponent } from 'src/app/components/delete-modal/delete-modal.component';

@Injectable({
  providedIn: 'root',
})
export class DeleteModalService {
  private dialogRef!: MatDialogRef<DeleteModalComponent>;

  constructor(public dialog: MatDialog) {}

  openDialog(id: string): void {
    this.dialogRef = this.dialog.open(DeleteModalComponent, {
      data: { id },
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
