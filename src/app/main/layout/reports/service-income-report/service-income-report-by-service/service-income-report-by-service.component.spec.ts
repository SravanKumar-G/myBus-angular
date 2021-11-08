import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceIncomeReportByServiceComponent } from './service-income-report-by-service.component';

describe('ServiceIncomeReportByServiceComponent', () => {
  let component: ServiceIncomeReportByServiceComponent;
  let fixture: ComponentFixture<ServiceIncomeReportByServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceIncomeReportByServiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceIncomeReportByServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
