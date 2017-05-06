import { TestBed, inject } from '@angular/core/testing';

import { CollectorService } from './collector.service';

describe('CollectorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CollectorService]
    });
  });

  it('should ...', inject([CollectorService], (service: CollectorService) => {
    expect(service).toBeTruthy();
  }));
});
