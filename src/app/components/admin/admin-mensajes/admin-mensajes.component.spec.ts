import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMensajesComponent } from './admin-mensajes.component';

describe('AdminMensajesComponent', () => {
  let component: AdminMensajesComponent;
  let fixture: ComponentFixture<AdminMensajesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminMensajesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMensajesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
