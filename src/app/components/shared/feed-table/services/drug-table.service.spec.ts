import { TestBed } from '@angular/core/testing';

import { DrugTableService } from './drug-table.service';

describe('DrugTableService', () => {
  let service: DrugTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DrugTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
