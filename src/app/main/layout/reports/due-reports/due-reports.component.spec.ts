import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DueReportsComponent } from './due-reports.component';

describe('DueReportsComponent', () => {
  let component: DueReportsComponent;
  let fixture: ComponentFixture<DueReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DueReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DueReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
