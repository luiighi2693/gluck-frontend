import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterPoolDialogComponent } from './register-pool-dialog.component';

describe('RegisterPoolDialogComponent', () => {
  let component: RegisterPoolDialogComponent;
  let fixture: ComponentFixture<RegisterPoolDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterPoolDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterPoolDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
