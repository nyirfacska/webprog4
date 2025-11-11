import { TestBed } from '@angular/core/testing';

import { Key } from './key';

describe('Key', () => {
  let service: Key;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Key);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
