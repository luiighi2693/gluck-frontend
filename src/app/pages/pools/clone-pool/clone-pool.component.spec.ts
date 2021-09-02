import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClonePoolComponent } from './clone-pool.component';

describe('ClonePoolComponent', () => {
  let component: ClonePoolComponent;
  let fixture: ComponentFixture<ClonePoolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClonePoolComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClonePoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
