import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavInternoComponent } from './nav-interno.component';

describe('NavInternoComponent', () => {
  let component: NavInternoComponent;
  let fixture: ComponentFixture<NavInternoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavInternoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavInternoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
