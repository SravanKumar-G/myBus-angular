import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCargoBookingComponent } from './view-cargo-booking.component';

describe('ViewCargoBookingComponent', () => {
  let component: ViewCargoBookingComponent;
  let fixture: ComponentFixture<ViewCargoBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCargoBookingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCargoBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
