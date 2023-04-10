import { Injectable } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { SYSTEM_CONSTANT } from '../constants/system.constant';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ChildAuthGuard implements CanActivateChild {
  constructor(private authService: AuthService, private router: Router) { }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    let url: string = state.url;
    return this.checkLogin(url);
  }

  checkLogin(url: string) {
    if (localStorage.getItem(SYSTEM_CONSTANT.USER_CURRENT)) {
      return true;
    }

    this.router.navigate(["/login"]);
    return false;
  }
}
