import { TestBed } from '@angular/core/testing';

import { DetailOrderBillService } from './detail-order-bill.service';

describe('DetailOrderBillService', () => {
  let service: DetailOrderBillService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetailOrderBillService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
