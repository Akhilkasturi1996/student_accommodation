import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentPayementComponent } from './student-payement.component';

describe('StudentPayementComponent', () => {
  let component: StudentPayementComponent;
  let fixture: ComponentFixture<StudentPayementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentPayementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentPayementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
