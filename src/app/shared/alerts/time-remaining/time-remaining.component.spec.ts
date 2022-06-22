import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeRemainingComponent } from './time-remaining.component';

describe('TimeRemainingComponent', () => {
  let component: TimeRemainingComponent;
  let fixture: ComponentFixture<TimeRemainingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeRemainingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeRemainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
