import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CashCollectionReportsComponent } from './cash-collection-reports.component';

describe('CashCollectionReportsComponent', () => {
  let component: CashCollectionReportsComponent;
  let fixture: ComponentFixture<CashCollectionReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CashCollectionReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CashCollectionReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
