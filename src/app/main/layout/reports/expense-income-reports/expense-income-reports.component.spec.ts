import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseIncomeReportsComponent } from './expense-income-reports.component';

describe('ExpenseIncomeReportsComponent', () => {
  let component: ExpenseIncomeReportsComponent;
  let fixture: ComponentFixture<ExpenseIncomeReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpenseIncomeReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseIncomeReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
