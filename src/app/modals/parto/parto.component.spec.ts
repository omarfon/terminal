import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartoComponent } from './parto.component';

describe('PartoComponent', () => {
  let component: PartoComponent;
  let fixture: ComponentFixture<PartoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
