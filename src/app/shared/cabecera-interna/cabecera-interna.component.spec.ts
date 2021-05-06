import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CabeceraInternaComponent } from './cabecera-interna.component';

describe('CabeceraInternaComponent', () => {
  let component: CabeceraInternaComponent;
  let fixture: ComponentFixture<CabeceraInternaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CabeceraInternaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CabeceraInternaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
