import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddEditEmployeeComponent } from './add-edit-employee.component';

describe('AddEditEmployeeComponent', () => {
  let component: AddEditEmployeeComponent;
  let fixture: ComponentFixture<AddEditEmployeeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditEmployeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
