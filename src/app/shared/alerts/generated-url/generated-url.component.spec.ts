import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratedUrlComponent } from './generated-url.component';

describe('GeneratedUrlComponent', () => {
  let component: GeneratedUrlComponent;
  let fixture: ComponentFixture<GeneratedUrlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneratedUrlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneratedUrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
