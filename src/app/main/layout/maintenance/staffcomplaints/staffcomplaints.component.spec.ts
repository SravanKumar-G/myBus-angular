import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffcomplaintsComponent } from './staffcomplaints.component';

describe('StaffcomplaintsComponent', () => {
  let component: StaffcomplaintsComponent;
  let fixture: ComponentFixture<StaffcomplaintsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaffcomplaintsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffcomplaintsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
