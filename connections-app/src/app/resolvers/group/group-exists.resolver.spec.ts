import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { groupExistsResolver } from './group-exists.resolver';

describe('groupExistsResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() =>
      groupExistsResolver(...resolverParameters)
    );

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
