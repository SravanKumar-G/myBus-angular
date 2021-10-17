import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceReportByServiceComponent } from './service-report-by-service.component';

describe('ServiceReportByServiceComponent', () => {
  let component: ServiceReportByServiceComponent;
  let fixture: ComponentFixture<ServiceReportByServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceReportByServiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceReportByServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
