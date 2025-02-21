import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const loggedData = localStorage.getItem('access_token');
  const loggedRole = localStorage.getItem('role');
  if(loggedData !== null && loggedRole === 'ADMIN'){
    return true;
  }else{
    router.navigateByUrl('login');
    return false;
  }
};
