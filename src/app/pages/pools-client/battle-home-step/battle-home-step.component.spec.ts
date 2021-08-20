import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BattleHomeStepComponent } from './battle-home-step.component';

describe('BattleHomeStepComponent', () => {
  let component: BattleHomeStepComponent;
  let fixture: ComponentFixture<BattleHomeStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BattleHomeStepComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BattleHomeStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
