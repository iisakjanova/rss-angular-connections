import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { GroupDialogComponent } from 'src/app/components/group-dialog/group-dialog.component';

@Component({
  selector: 'app-group-dialog-page',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule, GroupDialogComponent],
  templateUrl: './group-dialog-page.component.html',
  styleUrls: ['./group-dialog-page.component.scss'],
})
export class GroupDialogPageComponent {}
