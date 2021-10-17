import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceIncomeReportComponent } from './service-income-report.component';

describe('ServiceIncomeReportComponent', () => {
  let component: ServiceIncomeReportComponent;
  let fixture: ComponentFixture<ServiceIncomeReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceIncomeReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceIncomeReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
