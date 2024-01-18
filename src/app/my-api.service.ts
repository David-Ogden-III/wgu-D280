import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyApiService {


  constructor(private http: HttpClient) { }

  getData(countryId: string | undefined): Observable<any> {
    var apiUrl = `http://api.worldbank.org/v2/country/${countryId}?format=json`;
    return this.http.get(apiUrl, {responseType: 'json'})
  }
}
