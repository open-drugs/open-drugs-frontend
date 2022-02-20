import { TestBed } from '@angular/core/testing';

import { OrganismTableService } from './organism-table.service';

describe('DrugTableService', () => {
  let service: OrganismTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrganismTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
