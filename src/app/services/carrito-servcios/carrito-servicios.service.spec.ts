import { TestBed } from '@angular/core/testing';

import { CarritoServiciosService } from './carrito-servicios.service';

describe('CarritoServiciosService', () => {
  let service: CarritoServiciosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarritoServiciosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
