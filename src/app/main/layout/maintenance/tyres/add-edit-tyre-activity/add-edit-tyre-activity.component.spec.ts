import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditTyreActivityComponent } from './add-edit-tyre-activity.component';

describe('AddEditTyreActivityComponent', () => {
  let component: AddEditTyreActivityComponent;
  let fixture: ComponentFixture<AddEditTyreActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditTyreActivityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditTyreActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
