import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoolResultComponent } from './pool-result.component';

describe('PoolResultComponent', () => {
  let component: PoolResultComponent;
  let fixture: ComponentFixture<PoolResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoolResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoolResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
