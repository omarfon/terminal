import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservaFinalizadaComponent } from './reserva-finalizada.component';

describe('ReservaFinalizadaComponent', () => {
  let component: ReservaFinalizadaComponent;
  let fixture: ComponentFixture<ReservaFinalizadaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservaFinalizadaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservaFinalizadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
