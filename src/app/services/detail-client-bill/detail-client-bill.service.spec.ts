import { TestBed } from '@angular/core/testing';

import { DetailClientBillService } from './detail-client-bill.service';

describe('DetailClientBillService', () => {
  let service: DetailClientBillService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetailClientBillService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
