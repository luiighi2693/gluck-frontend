import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfTeamsComponent } from './list-of-teams.component';

describe('ListOfTeamsComponent', () => {
  let component: ListOfTeamsComponent;
  let fixture: ComponentFixture<ListOfTeamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOfTeamsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfTeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
