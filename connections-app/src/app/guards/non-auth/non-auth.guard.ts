import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

export const nonAuthGuard: CanActivateFn = () => {
  const authService = new AuthService();
  const userCredentials = authService.getCredentials();

  const isAuthenticated =
    userCredentials.email && userCredentials.uid && userCredentials.token;
  const router = inject(Router);
  return !isAuthenticated || router.createUrlTree(['/']);
};
