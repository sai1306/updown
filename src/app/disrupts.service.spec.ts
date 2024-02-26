import { TestBed } from '@angular/core/testing';

import { DisruptsService } from './disrupts.service';

describe('DisruptsService', () => {
  let service: DisruptsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DisruptsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
