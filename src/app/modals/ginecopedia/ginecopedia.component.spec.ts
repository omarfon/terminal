import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GinecopediaComponent } from './ginecopedia.component';

describe('GinecopediaComponent', () => {
  let component: GinecopediaComponent;
  let fixture: ComponentFixture<GinecopediaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GinecopediaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GinecopediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
