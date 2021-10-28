import { TestBed } from '@angular/core/testing';

import { CarordenService } from './carorden.service';

describe('CarordenService', () => {
  let service: CarordenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarordenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
