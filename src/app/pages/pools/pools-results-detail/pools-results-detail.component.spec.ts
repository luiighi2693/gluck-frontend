import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoolsResultsDetailComponent } from './pools-results-detail.component';

describe('PoolsResultsDetailComponent', () => {
  let component: PoolsResultsDetailComponent;
  let fixture: ComponentFixture<PoolsResultsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoolsResultsDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoolsResultsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
