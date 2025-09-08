import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:5555/users';

  constructor(private http: HttpClient) {}

  getMe(): Observable<any> {
    return this.http.get(`${this.apiUrl}/me`);
  }
}
