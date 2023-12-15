import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CreateModalComponent } from 'src/app/components/modal/create-modal.component';

@Injectable({
  providedIn: 'root',
})
export class CreateModalService {
  private dialogRef!: MatDialogRef<CreateModalComponent>;

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    this.dialogRef = this.dialog.open(CreateModalComponent);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
