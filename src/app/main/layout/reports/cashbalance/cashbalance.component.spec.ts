import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashbalanceComponent } from './cashbalance.component';

describe('CashbalanceComponent', () => {
  let component: CashbalanceComponent;
  let fixture: ComponentFixture<CashbalanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashbalanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CashbalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
