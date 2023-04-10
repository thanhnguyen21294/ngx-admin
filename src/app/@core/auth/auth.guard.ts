import { Injectable } from "@angular/core";
import {
    CanActivate,
    Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    NavigationExtras,
    Route,
    CanActivateChild
} from "@angular/router";
import { SYSTEM_CONSTANT } from "../constants/system.constant";
import { AuthService } from "../service/auth.service";

@Injectable({
    providedIn: "root"
})
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private authService: AuthService) {}

    public canActivate(
        route: ActivatedRouteSnapshot,
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
