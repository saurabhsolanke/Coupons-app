import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Coupons } from './coupons';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LocaldbService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  }
  public apiURL = environment.local;

  getAll(): Observable<Coupons[]> {
    return this.http.get<Coupons[]>(this.apiURL + 'coupons/',)
  }

  // update(id: number, coupons: any): Observable<Coupons> {
  //   return this.http.put<Coupons>(this.apiURL + 'coupons/' + id, JSON.stringify(coupons))
  // }

  update(couponId: string, used: boolean): Observable<any> {
    const url = `${this.apiURL}coupons/${couponId}`;
    const body = { used: used };

    return this.http.patch(url, body, this.httpOptions)
  }
}
