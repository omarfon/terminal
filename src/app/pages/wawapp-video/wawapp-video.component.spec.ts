import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WawappVideoComponent } from './wawapp-video.component';

describe('WawappVideoComponent', () => {
  let component: WawappVideoComponent;
  let fixture: ComponentFixture<WawappVideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WawappVideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WawappVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
