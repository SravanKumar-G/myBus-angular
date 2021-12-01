import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDuePaymentSummaryComponent } from './show-due-payment-summary.component';

describe('ShowDuePaymentSummaryComponent', () => {
  let component: ShowDuePaymentSummaryComponent;
  let fixture: ComponentFixture<ShowDuePaymentSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowDuePaymentSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowDuePaymentSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
