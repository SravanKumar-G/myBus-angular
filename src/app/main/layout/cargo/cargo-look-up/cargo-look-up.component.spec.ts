import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargoLookUpComponent } from './cargo-look-up.component';

describe('CargoLookUpComponent', () => {
  let component: CargoLookUpComponent;
  let fixture: ComponentFixture<CargoLookUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CargoLookUpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CargoLookUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
