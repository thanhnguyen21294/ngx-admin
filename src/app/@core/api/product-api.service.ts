import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { SYSTEM_CONSTANT } from "../constants/system.constant";
const headers = new HttpHeaders({ "Content-Type": "application/json" });

@Injectable({
  providedIn: 'root'
})

export class ProductApiService {
  baseUrl = SYSTEM_CONSTANT.API_URL;

  constructor(
    private httpClient: HttpClient,
  ) {}

  get(): Observable<any> {
    return this.httpClient.get(this.baseUrl + "/products", {
      headers: headers,
    });
  }

  post(data : any): Observable<any> {
    return this.httpClient.post(this.baseUrl + "/products", JSON.stringify(data), {
      headers: headers,
    });
  }

  put(dataId: string, data : any): Observable<any> {
    return this.httpClient.put(this.baseUrl + `/products/${dataId}`, JSON.stringify(data), {
      headers: headers,
    });
  }

  deleteById(id: string): Observable<any> {
    return this.httpClient.delete(this.baseUrl + "/users" + `/${id}`, {
      headers: headers
    })
  }
}
