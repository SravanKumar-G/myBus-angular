import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceStaffAllocationsComponent } from './service-staff-allocations.component';

describe('ServiceStaffAllocationsComponent', () => {
  let component: ServiceStaffAllocationsComponent;
  let fixture: ComponentFixture<ServiceStaffAllocationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceStaffAllocationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceStaffAllocationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
