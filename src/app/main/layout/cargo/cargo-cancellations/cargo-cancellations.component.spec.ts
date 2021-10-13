import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargoCancellationsComponent } from './cargo-cancellations.component';

describe('CargoCancellationsComponent', () => {
  let component: CargoCancellationsComponent;
  let fixture: ComponentFixture<CargoCancellationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CargoCancellationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CargoCancellationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
