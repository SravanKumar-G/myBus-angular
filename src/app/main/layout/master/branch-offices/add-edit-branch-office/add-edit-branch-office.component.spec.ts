import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditBranchOfficeComponent } from './add-edit-branch-office.component';

describe('AddEditBranchOfficeComponent', () => {
  let component: AddEditBranchOfficeComponent;
  let fixture: ComponentFixture<AddEditBranchOfficeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditBranchOfficeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditBranchOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
