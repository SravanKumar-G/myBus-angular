import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficeExpensesComponent } from './office-expenses.component';

describe('OfficeExpensesComponent', () => {
  let component: OfficeExpensesComponent;
  let fixture: ComponentFixture<OfficeExpensesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfficeExpensesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficeExpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
