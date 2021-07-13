import { TestBed } from '@angular/core/testing';

import { MapMarkersService } from './map-markers.service';

describe('MapMarkersService', () => {
  let service: MapMarkersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapMarkersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
