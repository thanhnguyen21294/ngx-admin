import { Router } from "@angular/router";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { SYSTEM_CONSTANT } from "../constants/system.constant";
import { catchError } from "rxjs/operators";

const headers = new HttpHeaders({ "content-type": "application/json" });

@Injectable({
  providedIn: "root"
})
export class AuthService {
  public redirectUrl: string;

  constructor(private httpClient: HttpClient, private router: Router) { }

  public login(username: string, password: string, rememberme = true): Observable<any> {
    const model = {
      username: username,
      password: password,
    }
    let url = SYSTEM_CONSTANT.API_URL + `/login`;
    return this.httpClient.post(url, model, { headers: headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        if(error.status === 401) {
          return throwError('Unauthorized');
        }
        return throwError(error.error.message)
      })
    )
  }

  public logout() {
    localStorage.removeItem(SYSTEM_CONSTANT.USER_CURRENT);
    this.router.navigate(['/login']);
  }

  public checkLoggedInUser(): boolean {
    return localStorage.getItem(SYSTEM_CONSTANT.USER_CURRENT)
      ? true
      : false;
  }
}
