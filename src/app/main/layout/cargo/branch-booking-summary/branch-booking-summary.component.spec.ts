import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchBookingSummaryComponent } from './branch-booking-summary.component';

describe('BranchBookingSummaryComponent', () => {
  let component: BranchBookingSummaryComponent;
  let fixture: ComponentFixture<BranchBookingSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BranchBookingSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchBookingSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
