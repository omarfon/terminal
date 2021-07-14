import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorRegisterComponent } from './error-register.component';

describe('ErrorRegisterComponent', () => {
  let component: ErrorRegisterComponent;
  let fixture: ComponentFixture<ErrorRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
