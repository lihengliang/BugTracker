import { TestBed } from '@angular/core/testing';

import { JwtUserProfileService } from './jwt-user-profile.service';

describe('JwtUserProfileService', () => {
  let service: JwtUserProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JwtUserProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
