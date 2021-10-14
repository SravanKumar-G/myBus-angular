import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingSheetComponent } from './loading-sheet.component';

describe('LoadingSheetComponent', () => {
  let component: LoadingSheetComponent;
  let fixture: ComponentFixture<LoadingSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadingSheetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
