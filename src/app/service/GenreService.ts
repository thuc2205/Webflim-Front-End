import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GenreResponse } from './../model/genre'; // Correct the import path if needed
import { Genre } from './../model/genre'; // Correct the import path if needed

@Injectable({
  providedIn: 'root'
})
export class GenreService {
  private apiUrl = 'http://localhost:8080/api/v1/genres'; // Adjust if necessary

  constructor(private http: HttpClient) { }

  getAllGenres(page: number = 0, limit: number = 10): Observable<GenreResponse> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    return this.http.get<GenreResponse>(this.apiUrl, { params });
  }

  addGenre(genre: Genre): Observable<Genre> {
    return this.http.post<Genre>(this.apiUrl, genre);
  }

  deleteGenre(name: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${encodeURIComponent(name)}`, { responseType: 'text' as 'json' });
  }

  updateGenre(name: string, genreRequest: Genre): Observable<Genre> {
    return this.http.put<Genre>(`${this.apiUrl}/${encodeURIComponent(name)}`, genreRequest);
  }
}
