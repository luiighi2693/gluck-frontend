import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoolCategoryComponent } from './pool-category.component';

describe('PoolCategoryComponent', () => {
  let component: PoolCategoryComponent;
  let fixture: ComponentFixture<PoolCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoolCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoolCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
