import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsPerUserComponent } from './results-per-user.component';

describe('ResultsPerUserComponent', () => {
  let component: ResultsPerUserComponent;
  let fixture: ComponentFixture<ResultsPerUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultsPerUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsPerUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
