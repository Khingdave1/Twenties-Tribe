import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CouponsService {

  private jsonUrl = 'couponDataTest.json';
  http = inject(HttpClient);

  getCoupons(): Observable<any> {
    return this.http.get<any>(this.jsonUrl);
  }
}
