import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatorAccountsComponent } from './operator-accounts.component';

describe('OperatorAccountsComponent', () => {
  let component: OperatorAccountsComponent;
  let fixture: ComponentFixture<OperatorAccountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperatorAccountsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OperatorAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
