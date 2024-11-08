import { TestBed } from '@angular/core/testing';

import { AuthSocialMediaService } from './auth-social-media.service';

describe('AuthSocialMediaService', () => {
  let service: AuthSocialMediaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthSocialMediaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
