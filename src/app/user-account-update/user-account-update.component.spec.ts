import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAccountUpdateComponent } from './user-account-update.component';

describe('UserAccountUpdateComponent', () => {
  let component: UserAccountUpdateComponent;
  let fixture: ComponentFixture<UserAccountUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAccountUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAccountUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
