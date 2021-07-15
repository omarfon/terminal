import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservaCuraComponent } from './reserva-cura.component';

describe('ReservaCuraComponent', () => {
  let component: ReservaCuraComponent;
  let fixture: ComponentFixture<ReservaCuraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservaCuraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservaCuraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
