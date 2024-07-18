import { TestBed } from '@angular/core/testing';
import { CanDeactivateFn } from '@angular/router';

import { verificarGuard } from './verificar.guard';

describe('verificarGuard', () => {
  const executeGuard: CanDeactivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => verificarGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
