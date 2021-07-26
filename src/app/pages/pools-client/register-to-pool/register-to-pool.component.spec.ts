import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterToPoolComponent } from './register-to-pool.component';

describe('RegisterToPoolComponent', () => {
  let component: RegisterToPoolComponent;
  let fixture: ComponentFixture<RegisterToPoolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterToPoolComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterToPoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
