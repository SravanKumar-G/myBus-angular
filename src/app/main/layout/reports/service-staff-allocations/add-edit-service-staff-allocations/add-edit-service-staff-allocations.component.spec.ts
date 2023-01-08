import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditServiceStaffAllocationsComponent } from './add-edit-service-staff-allocations.component';

describe('AddEditServiceStaffAllocationsComponent', () => {
  let component: AddEditServiceStaffAllocationsComponent;
  let fixture: ComponentFixture<AddEditServiceStaffAllocationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditServiceStaffAllocationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditServiceStaffAllocationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
