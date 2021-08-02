import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoolRegisterComponent } from './pool-register.component';

describe('PoolRegisterComponent', () => {
  let component: PoolRegisterComponent;
  let fixture: ComponentFixture<PoolRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoolRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoolRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
