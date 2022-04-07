import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessLoggedComponent } from './success-logged.component';

describe('SuccessLoggedComponent', () => {
  let component: SuccessLoggedComponent;
  let fixture: ComponentFixture<SuccessLoggedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuccessLoggedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessLoggedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
