import { TestBed } from '@angular/core/testing';

import { LookupBoxService } from './lookup-box.service';

describe('LookupBoxService', () => {
  let service: LookupBoxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LookupBoxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
