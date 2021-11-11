import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsToBeReviewedComponent } from './reports-to-be-reviewed.component';

describe('ReportsToBeReviewedComponent', () => {
  let component: ReportsToBeReviewedComponent;
  let fixture: ComponentFixture<ReportsToBeReviewedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportsToBeReviewedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsToBeReviewedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
