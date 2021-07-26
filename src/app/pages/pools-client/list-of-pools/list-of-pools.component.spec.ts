import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfPoolsComponent } from './list-of-pools.component';

describe('ListOfPoolsComponent', () => {
  let component: ListOfPoolsComponent;
  let fixture: ComponentFixture<ListOfPoolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOfPoolsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfPoolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
