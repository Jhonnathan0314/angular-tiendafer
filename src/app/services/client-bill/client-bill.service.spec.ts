import { TestBed } from '@angular/core/testing';

import { ClientBillService } from './client-bill.service';

describe('ClientBillService', () => {
  let service: ClientBillService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientBillService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
