import { TestBed } from '@angular/core/testing';

import { RentaServiciosService } from './renta-servicios.service';

describe('RentaServiciosService', () => {
  let service: RentaServiciosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RentaServiciosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
