import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroCuraComponent } from './registro-cura.component';

describe('RegistroCuraComponent', () => {
  let component: RegistroCuraComponent;
  let fixture: ComponentFixture<RegistroCuraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroCuraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroCuraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
