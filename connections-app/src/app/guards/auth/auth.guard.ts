import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const isAuthenticated =
    localStorage.getItem('token') &&
    localStorage.getItem('email') &&
    localStorage.getItem('uid');

  const router = inject(Router);
  return !!isAuthenticated || router.createUrlTree(['/signin']);
};
