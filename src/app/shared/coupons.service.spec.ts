import { TestBed } from '@angular/core/testing';

import { CouponsService } from './coupons.service';
import { provideHttpClient } from '@angular/common/http';

describe('CouponsService', () => {
  let service: CouponsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CouponsService,
        provideHttpClient()
      ],
    });
    service = TestBed.inject(CouponsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
