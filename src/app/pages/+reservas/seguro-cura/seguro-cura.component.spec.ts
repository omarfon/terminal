import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeguroCuraComponent } from './seguro-cura.component';

describe('SeguroCuraComponent', () => {
  let component: SeguroCuraComponent;
  let fixture: ComponentFixture<SeguroCuraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeguroCuraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeguroCuraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
