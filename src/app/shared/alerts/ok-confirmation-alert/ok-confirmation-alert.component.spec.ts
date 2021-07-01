import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OkConfirmationAlertComponent } from './ok-confirmation-alert.component';

describe('OkConfirmationAlertComponent', () => {
  let component: OkConfirmationAlertComponent;
  let fixture: ComponentFixture<OkConfirmationAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OkConfirmationAlertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OkConfirmationAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
