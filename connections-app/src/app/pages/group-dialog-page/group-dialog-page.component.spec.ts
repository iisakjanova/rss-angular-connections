import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupDialogPageComponent } from './group-dialog-page.component';

describe('GroupDialogPageComponent', () => {
  let component: GroupDialogPageComponent;
  let fixture: ComponentFixture<GroupDialogPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [GroupDialogPageComponent],
    });
    fixture = TestBed.createComponent(GroupDialogPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
