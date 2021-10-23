import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficeDueReportByDateComponent } from './office-due-report-by-date.component';

describe('OfficeDueReportByDateComponent', () => {
  let component: OfficeDueReportByDateComponent;
  let fixture: ComponentFixture<OfficeDueReportByDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfficeDueReportByDateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficeDueReportByDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
