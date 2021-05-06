import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppLayoutReservasComponent } from './app-layout-reservas.component';

describe('AppLayoutReservasComponent', () => {
  let component: AppLayoutReservasComponent;
  let fixture: ComponentFixture<AppLayoutReservasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppLayoutReservasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppLayoutReservasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
