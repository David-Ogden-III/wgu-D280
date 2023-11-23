import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyApiService {

  private apiUrl = 'http://api.worldbank.org/v2/country/ru?format=json';

  constructor(private http: HttpClient) { }

  getData(countryId: string | undefined): Observable<any> {
    return this.http.get('http://api.worldbank.org/v2/country/' + countryId + '?format=json', {responseType: 'json'})
  }
}
