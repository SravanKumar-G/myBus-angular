import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargoBookingsComponent } from './cargo-bookings.component';

describe('CargoBookingsComponent', () => {
  let component: CargoBookingsComponent;
  let fixture: ComponentFixture<CargoBookingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CargoBookingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CargoBookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
