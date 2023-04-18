import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { SYSTEM_CONSTANT } from "../constants/system.constant";
const headers = new HttpHeaders({ "Content-Type": "application/json" });

@Injectable()
export class DataService {

  constructor(private _http: HttpClient) {}
  public baseUrl = SYSTEM_CONSTANT.API_URL;

  get(uri: string): Observable<any> {
    return this._http.get(this.baseUrl + uri, {
      headers: headers,
    });
  }

  post(uri: string, data? : any): Observable<any> {
    return this._http.post(this.baseUrl + uri, JSON.stringify(data), {
      headers: headers,
    });
  }

  put(uri: string, data? : any): Observable<any> {
    return this._http.put(this.baseUrl + uri, JSON.stringify(data), {
      headers: headers,
    });
  }

  deleteById(uri: string, id: string): Observable<any> {
    return this._http.delete(this.baseUrl + uri + `/${id}`, {
      headers: headers
    })
  }

  delete(uri: string, key: string, value: string): Observable<any> {
    return this._http.delete(this.baseUrl + uri + "?" + key + "=" + value, {
      headers: headers,
    });
  }
}
