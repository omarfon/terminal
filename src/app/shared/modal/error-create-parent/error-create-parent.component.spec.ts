import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorCreateParentComponent } from './error-create-parent.component';

describe('ErrorCreateParentComponent', () => {
  let component: ErrorCreateParentComponent;
  let fixture: ComponentFixture<ErrorCreateParentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorCreateParentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorCreateParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
