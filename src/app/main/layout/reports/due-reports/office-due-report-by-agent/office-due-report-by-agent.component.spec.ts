import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficeDueReportByAgentComponent } from './office-due-report-by-agent.component';

describe('OfficeDueReportByAgentComponent', () => {
  let component: OfficeDueReportByAgentComponent;
  let fixture: ComponentFixture<OfficeDueReportByAgentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfficeDueReportByAgentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficeDueReportByAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
