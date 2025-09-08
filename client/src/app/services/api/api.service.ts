import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private plMatchDataURL = 'http://localhost:5555/api/pl-results';

  constructor(private http: HttpClient) {}

  getPLMatchData(): Observable<any> {
    return this.http.get(`${this.plMatchDataURL}`);
  }
}
