import {inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HeaderComponent } from '../header/header.component';





export const AuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const router: Router = inject(Router);
  const protectedRoutes: string[] = ['/'];
  if (localStorage.getItem('token')) {
    return true;
  } else {
    router.navigate(['/'])
    return false;
  }

};









