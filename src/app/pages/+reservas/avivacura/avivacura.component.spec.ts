import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvivacuraComponent } from './avivacura.component';

describe('CuraComponent', () => {
  let component: AvivacuraComponent;
  let fixture: ComponentFixture<AvivacuraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvivacuraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvivacuraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
