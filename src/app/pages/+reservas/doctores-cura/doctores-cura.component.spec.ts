import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctoresCuraComponent } from './doctores-cura.component';

describe('DoctoresCuraComponent', () => {
  let component: DoctoresCuraComponent;
  let fixture: ComponentFixture<DoctoresCuraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctoresCuraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctoresCuraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
