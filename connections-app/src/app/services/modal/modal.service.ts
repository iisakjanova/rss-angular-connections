import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalComponent } from 'src/app/components/modal/modal.component';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private dialogRef!: MatDialogRef<ModalComponent>;

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    this.dialogRef = this.dialog.open(ModalComponent);
  }

  getDialogRef(): MatDialogRef<ModalComponent> {
    return this.dialogRef;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
