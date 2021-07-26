import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoolsResultsComponent } from './pools-results.component';

describe('PoolsResultsComponent', () => {
  let component: PoolsResultsComponent;
  let fixture: ComponentFixture<PoolsResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoolsResultsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoolsResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
