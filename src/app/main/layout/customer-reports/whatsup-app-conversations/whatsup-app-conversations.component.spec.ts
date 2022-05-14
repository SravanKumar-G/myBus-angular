import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatsupAppConversationsComponent } from './whatsup-app-conversations.component';

describe('WhatsupAppConversationsComponent', () => {
  let component: WhatsupAppConversationsComponent;
  let fixture: ComponentFixture<WhatsupAppConversationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhatsupAppConversationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhatsupAppConversationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
