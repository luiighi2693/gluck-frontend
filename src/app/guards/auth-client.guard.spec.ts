import { TestBed } from '@angular/core/testing';

import { AuthClientGuard } from './auth-client.guard';

describe('AuthClientGuard', () => {
  let guard: AuthClientGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthClientGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
