import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficeDueReportComponent } from './office-due-report.component';

describe('OfficeDueReportComponent', () => {
  let component: OfficeDueReportComponent;
  let fixture: ComponentFixture<OfficeDueReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfficeDueReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficeDueReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
