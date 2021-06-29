import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FootballPoolsComponent } from './football-pools.component';

describe('FootballPoolsComponent', () => {
  let component: FootballPoolsComponent;
  let fixture: ComponentFixture<FootballPoolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FootballPoolsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FootballPoolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
