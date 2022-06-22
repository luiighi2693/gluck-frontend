import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyResultsComponent } from './my-results.component';

describe('PoolResultComponent', () => {
  let component: MyResultsComponent;
  let fixture: ComponentFixture<MyResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyResultsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
