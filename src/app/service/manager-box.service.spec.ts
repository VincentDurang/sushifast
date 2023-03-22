import { TestBed } from '@angular/core/testing';

import { ManagerBoxService } from './manager-box.service';

describe('ManagerBoxService', () => {
  let service: ManagerBoxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManagerBoxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
