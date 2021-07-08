import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfClientsComponent } from './list-of-clients.component';

describe('ListOfClientsComponent', () => {
  let component: ListOfClientsComponent;
  let fixture: ComponentFixture<ListOfClientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOfClientsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
