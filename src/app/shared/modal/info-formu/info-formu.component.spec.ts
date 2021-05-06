import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoFormuComponent } from './info-formu.component';

describe('InfoFormuComponent', () => {
  let component: InfoFormuComponent;
  let fixture: ComponentFixture<InfoFormuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoFormuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoFormuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
