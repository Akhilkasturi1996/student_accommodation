import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpModelComponent } from './pop-up-model.component';

describe('PopUpModelComponent', () => {
  let component: PopUpModelComponent;
  let fixture: ComponentFixture<PopUpModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopUpModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopUpModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
