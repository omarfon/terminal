import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OkaComponent } from './oka.component';

describe('OkaComponent', () => {
  let component: OkaComponent;
  let fixture: ComponentFixture<OkaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OkaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OkaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
