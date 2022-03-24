import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDetailDoctorsComponent } from './modal-detail-doctors.component';

describe('ModalDetailDoctorsComponent', () => {
  let component: ModalDetailDoctorsComponent;
  let fixture: ComponentFixture<ModalDetailDoctorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDetailDoctorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDetailDoctorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
