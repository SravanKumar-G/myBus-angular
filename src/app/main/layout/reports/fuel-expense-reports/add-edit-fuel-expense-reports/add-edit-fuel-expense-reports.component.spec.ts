import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditFuelExpenseReportsComponent } from './add-edit-fuel-expense-reports.component';

describe('AddEditFuelExpenseReportsComponent', () => {
  let component: AddEditFuelExpenseReportsComponent;
  let fixture: ComponentFixture<AddEditFuelExpenseReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditFuelExpenseReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditFuelExpenseReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
