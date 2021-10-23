import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditOfficeExpenseComponent } from './add-edit-office-expense.component';

describe('AddEditOfficeExpenseComponent', () => {
  let component: AddEditOfficeExpenseComponent;
  let fixture: ComponentFixture<AddEditOfficeExpenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditOfficeExpenseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditOfficeExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
