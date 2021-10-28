import { TestBed } from '@angular/core/testing';

import { SubirimgService } from './subirimg.service';

describe('SubirimgService', () => {
  let service: SubirimgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubirimgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
