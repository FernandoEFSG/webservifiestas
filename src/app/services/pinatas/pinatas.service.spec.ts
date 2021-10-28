import { TestBed } from '@angular/core/testing';

import { PinatasService } from './pinatas.service';

describe('PinatasService', () => {
  let service: PinatasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PinatasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
