import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { conversationResolver } from './conversation.resolver';

describe('conversationResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() =>
      conversationResolver(...resolverParameters)
    );

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
