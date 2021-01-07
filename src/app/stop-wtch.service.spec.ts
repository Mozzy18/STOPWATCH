import { TestBed } from '@angular/core/testing';

import { StopWtchService } from './stop-wtch.service';

describe('StopWtchService', () => {
  let service: StopWtchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StopWtchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
