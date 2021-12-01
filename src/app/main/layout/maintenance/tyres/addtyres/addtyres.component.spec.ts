import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddtyresComponent } from './addtyres.component';

describe('AddtyresComponent', () => {
  let component: AddtyresComponent;
  let fixture: ComponentFixture<AddtyresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddtyresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddtyresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
