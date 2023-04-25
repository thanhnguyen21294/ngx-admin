import { Router } from "@angular/router";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject, throwError } from "rxjs";
import { SYSTEM_CONSTANT } from "../constants/system.constant";
import { Auth, User } from "../models/user";
import { catchError, map } from "rxjs/operators";

const headers = new HttpHeaders({ "content-type": "application/json" });

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private authSubject = new Subject<Auth>();
  public redirectUrl: string;

  constructor(private httpClient: HttpClient, private router: Router) {}

  setUser(authUser: Auth) {
    if(authUser) {
      localStorage.setItem(SYSTEM_CONSTANT.USER_CURRENT, JSON.stringify(authUser));
      this.authSubject.next(authUser);
      console.log(this.authSubject)
    }
  }

  getUser() {
    return this.authSubject.asObservable();
  }

  public login(username: string, password: string): Observable<Auth> {
    const body = {
      username: username,
      password: password,
    }
    let url = SYSTEM_CONSTANT.API_URL + `/login`;
    return this.httpClient.post<Auth>(url, body, { headers: headers });
  }

  public logout() {
    localStorage.removeItem(SYSTEM_CONSTANT.USER_CURRENT);
    this.authSubject.next(null);
    this.router.navigate(['/login']);
  }
}
