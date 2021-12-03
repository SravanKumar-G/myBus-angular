import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HaltReportsComponent } from './halt-reports.component';

describe('HaltReportsComponent', () => {
  let component: HaltReportsComponent;
  let fixture: ComponentFixture<HaltReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HaltReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HaltReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
