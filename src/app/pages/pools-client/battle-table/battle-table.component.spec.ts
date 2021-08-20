import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BattleTableComponent } from './battle-table.component';

describe('BattleTableComponent', () => {
  let component: BattleTableComponent;
  let fixture: ComponentFixture<BattleTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BattleTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BattleTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
