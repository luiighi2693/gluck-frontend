import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPoolComponent } from './add-pool.component';

describe('AddPoolComponent', () => {
  let component: AddPoolComponent;
  let fixture: ComponentFixture<AddPoolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPoolComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
