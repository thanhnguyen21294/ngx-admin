import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { SYSTEM_CONSTANT } from "../constants/system.constant";
import { ApiOptions } from "../models/api-option";
import { environment } from "../../../environments/environment";
const headers = new HttpHeaders({ "Content-Type": "application/json" });

const PRODUCTS_API_ENDPOINT: string = environment.API_ENDPOINT + "/products";
@Injectable({
  providedIn: 'root'
})

export class ProductApiService {
  baseUrl = SYSTEM_CONSTANT.API_URL;

  constructor(
    private httpClient: HttpClient,
  ) { }

  getDataForChart(): Observable<HttpResponse<any>> {
    return this.httpClient.get(PRODUCTS_API_ENDPOINT , {
      observe: "response",
    });
  }


  get(options: ApiOptions): Observable<HttpResponse<any>> {
    let queryParams = [];
    queryParams.push("_page=" + (options.currentPage || SYSTEM_CONSTANT.pageIndex));
    queryParams.push("_sort=" + (options.column || "id"));
    queryParams.push("_order=" + (options.direction || "desc"));
    queryParams.push("_limit=" + (options.itemsPerPage || SYSTEM_CONSTANT.pageDisplay));
    queryParams.push("q=" + (options.keyword || ""));
    const queryParamsUrl = queryParams.join("&");

    const api = PRODUCTS_API_ENDPOINT + `?${queryParamsUrl}`;

    return this.httpClient.get(api, {
      observe: "response"
    });
  }

  post(data: any): Observable<any> {
    return this.httpClient.post(PRODUCTS_API_ENDPOINT , JSON.stringify(data), {
      headers: headers,
    });
  }

  put(dataId: string, data: any): Observable<any> {
    return this.httpClient.put(PRODUCTS_API_ENDPOINT + `/${dataId}`, JSON.stringify(data), {
      headers: headers,
    });
  }

  patch(dataId: string, data: any): Observable<any> {
    return this.httpClient.patch(PRODUCTS_API_ENDPOINT + `/${dataId}`, JSON.stringify(data), {
      headers: headers,
    });
  }

  deleteById(id: string): Observable<any> {
    return this.httpClient.delete(PRODUCTS_API_ENDPOINT + `/${id}`, {
      headers: headers
    })
  }
}
