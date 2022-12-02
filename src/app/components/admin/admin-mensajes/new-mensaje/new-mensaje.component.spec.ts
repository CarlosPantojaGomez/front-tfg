import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMensajeComponent } from './new-mensaje.component';

describe('NewMensajeComponent', () => {
  let component: NewMensajeComponent;
  let fixture: ComponentFixture<NewMensajeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewMensajeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewMensajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
