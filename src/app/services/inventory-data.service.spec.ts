import { TestBed } from '@angular/core/testing';

import { InventoryDataService } from './inventory-data.service';

describe('InventoryDataService', () => {
  let service: InventoryDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InventoryDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
