import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvivacuidaComponent } from './avivacuida.component';

describe('AvivacuidaComponent', () => {
  let component: AvivacuidaComponent;
  let fixture: ComponentFixture<AvivacuidaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvivacuidaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvivacuidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
