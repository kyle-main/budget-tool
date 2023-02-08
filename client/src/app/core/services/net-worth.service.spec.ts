import { TestBed } from '@angular/core/testing';

import { NetWorthService } from './net-worth.service';

describe('NetWorthService', () => {
  let service: NetWorthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NetWorthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
