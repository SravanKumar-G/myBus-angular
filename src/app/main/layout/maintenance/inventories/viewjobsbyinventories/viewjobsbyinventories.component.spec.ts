import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewjobsbyinventoriesComponent } from './viewjobsbyinventories.component';

describe('ViewjobsbyinventoriesComponent', () => {
  let component: ViewjobsbyinventoriesComponent;
  let fixture: ComponentFixture<ViewjobsbyinventoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewjobsbyinventoriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewjobsbyinventoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
