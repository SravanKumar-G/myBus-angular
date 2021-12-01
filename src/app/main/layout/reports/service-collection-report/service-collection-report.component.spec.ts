import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceCollectionReportComponent } from './service-collection-report.component';

describe('ServiceCollectionReportComponent', () => {
  let component: ServiceCollectionReportComponent;
  let fixture: ComponentFixture<ServiceCollectionReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceCollectionReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceCollectionReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
