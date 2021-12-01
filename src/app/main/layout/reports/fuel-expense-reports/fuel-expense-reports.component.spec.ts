import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuelExpenseReportsComponent } from './fuel-expense-reports.component';

describe('FuelExpenseReportsComponent', () => {
  let component: FuelExpenseReportsComponent;
  let fixture: ComponentFixture<FuelExpenseReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FuelExpenseReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FuelExpenseReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
