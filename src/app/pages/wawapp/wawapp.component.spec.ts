import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WawappComponent } from './wawapp.component';

describe('WawappComponent', () => {
  let component: WawappComponent;
  let fixture: ComponentFixture<WawappComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WawappComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WawappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
