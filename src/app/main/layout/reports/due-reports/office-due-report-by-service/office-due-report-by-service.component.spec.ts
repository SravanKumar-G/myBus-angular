import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficeDueReportByServiceComponent } from './office-due-report-by-service.component';

describe('OfficeDueReportByServiceComponent', () => {
  let component: OfficeDueReportByServiceComponent;
  let fixture: ComponentFixture<OfficeDueReportByServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfficeDueReportByServiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficeDueReportByServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
