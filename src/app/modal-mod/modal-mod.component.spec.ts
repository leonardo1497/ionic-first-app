import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalModComponent } from './modal-mod.component';

describe('ModalModComponent', () => {
  let component: ModalModComponent;
  let fixture: ComponentFixture<ModalModComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalModComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalModComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
