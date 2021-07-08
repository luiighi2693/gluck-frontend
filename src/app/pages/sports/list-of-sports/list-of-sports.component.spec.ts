import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfSportsComponent } from './list-of-sports.component';

describe('ListOfSportsComponent', () => {
  let component: ListOfSportsComponent;
  let fixture: ComponentFixture<ListOfSportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOfSportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfSportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
