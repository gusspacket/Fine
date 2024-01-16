import {inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../servise/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { AuthModalComponent } from '../auth-modal/auth-modal.component';





export const AuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) =>
{
  const router: Router = inject(Router);
  const isLoggin = inject(AuthService).isLoggedInSubject.value
  const openDialog = inject(MatDialog)

  if (isLoggin) {
    return true;
  } else {
    router.navigate([''])
    openDialog.open(AuthModalComponent, {
      width: '320px',
      height: '320px',
    });
    return false;
  }

};











