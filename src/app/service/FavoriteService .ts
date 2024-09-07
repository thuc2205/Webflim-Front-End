import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { evironment } from '../../../src/app/enviroment/evironment';

interface FavoriteRequest {
  username: string;
  titleMovie: string;
}

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  private apiUrl = `${evironment.apiBaseUrl}/favorites`;

  constructor(private http: HttpClient) { }

  addFavorite(request: FavoriteRequest): Observable<any> {
    return this.http.post<any>(this.apiUrl, request);
  }

  removeFavorite(request: FavoriteRequest): Observable<void> {
    return this.http.request<void>('DELETE', `${this.apiUrl}/remove`, { body: request });
  }

  findFavorite(request: FavoriteRequest): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/find`, request);
  }
}
