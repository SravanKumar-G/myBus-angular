import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceFeedbackReportComponent } from './service-feedback-report.component';

describe('ServiceFeedbackReportComponent', () => {
  let component: ServiceFeedbackReportComponent;
  let fixture: ComponentFixture<ServiceFeedbackReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceFeedbackReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceFeedbackReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
