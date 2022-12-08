import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGraficosComponent } from './admin-graficos.component';

describe('AdminGraficosComponent', () => {
  let component: AdminGraficosComponent;
  let fixture: ComponentFixture<AdminGraficosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminGraficosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminGraficosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
