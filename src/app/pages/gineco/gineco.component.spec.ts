import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GinecoComponent } from './gineco.component';

describe('GinecoComponent', () => {
  let component: GinecoComponent;
  let fixture: ComponentFixture<GinecoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GinecoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GinecoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
