import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PediatriaComponent } from './pediatria.component';

describe('PediatriaComponent', () => {
  let component: PediatriaComponent;
  let fixture: ComponentFixture<PediatriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PediatriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PediatriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
