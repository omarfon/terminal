import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MamappComponent } from './mamapp.component';

describe('MamappComponent', () => {
  let component: MamappComponent;
  let fixture: ComponentFixture<MamappComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MamappComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MamappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
