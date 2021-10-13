import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargoDashboardComponent } from './cargo-dashboard.component';

describe('CargoDashboardComponent', () => {
  let component: CargoDashboardComponent;
  let fixture: ComponentFixture<CargoDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CargoDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CargoDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
