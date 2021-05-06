import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MamappVideoComponent } from './mamapp-video.component';

describe('MamappVideoComponent', () => {
  let component: MamappVideoComponent;
  let fixture: ComponentFixture<MamappVideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MamappVideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MamappVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
