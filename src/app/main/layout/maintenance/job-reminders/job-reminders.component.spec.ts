import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobRemindersComponent } from './job-reminders.component';

describe('JobRemindersComponent', () => {
  let component: JobRemindersComponent;
  let fixture: ComponentFixture<JobRemindersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobRemindersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobRemindersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
