import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditOperatorAccountsComponent } from './add-edit-operator-accounts.component';

describe('AddEditOperatorAccountsComponent', () => {
  let component: AddEditOperatorAccountsComponent;
  let fixture: ComponentFixture<AddEditOperatorAccountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditOperatorAccountsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditOperatorAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
