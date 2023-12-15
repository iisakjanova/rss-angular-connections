import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Store } from '@ngrx/store';
import * as GroupsActions from 'src/app/redux/actions/groups.actions';
import { selectGroupsLoading } from 'src/app/redux/selectors/groups.selectors';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ModalService } from 'src/app/services/modal/modal.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  form!: FormGroup;

  loading$ = this.store.select(selectGroupsLoading);

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private authService: AuthService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z0-9\s]*$/),
          Validators.maxLength(30),
        ],
      ],
    });
  }

  onCancelClick(): void {
    this.modalService.closeDialog();
  }

  onSubmitClick(): void {
    const createdAt = new Date().getTime().toString();
    const credentials = this.authService.getCredentials();
    const params = { ...credentials, name: this.form.value.name, createdAt };
    this.store.dispatch(GroupsActions.createGroup(params));
  }
}
