import { evironment} from '../enviroment/evironment';
import { Injectable } from '@angular/core';
import { HttpClient,HttpParams  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from '../model/movie';
import { MovieRequest } from '../model/MovieRequest';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
    providedIn: 'root',
  })
  export class MovieService {
    private apiGetMoviesUrl = `${evironment.apiBaseUrl}/movies`;

    constructor(private http: HttpClient) {}
  
    getTop3Movies(): Observable<Movie[]> {
      return this.http.get<Movie[]>(this.apiGetMoviesUrl +`/newest`).pipe(
        catchError(error => {
          console.error('Error fetching movies:', error);
          return throwError(() => new Error('Failed to fetch movies'));
        })
      );
    }

    getMovieByName(title: string): Observable<Movie> {  // Trả về 1 đối tượng Movie
      const url = `${this.apiGetMoviesUrl}/${encodeURIComponent(title)}`;
      return this.http.get<Movie>(url).pipe(
        catchError(error => {
          console.error('Error fetching movie:', error);
          return throwError(() => new Error('Failed to fetch movie'));
        })
      );
    }
     // Phương thức mới để lấy danh sách các phim yêu thích của người dùng
  getFavoriteMoviesByUser(username: string): Observable<Movie[]> {
    const url = `${this.apiGetMoviesUrl}/user/${encodeURIComponent(username)}/favorites`;
    return this.http.get<Movie[]>(url).pipe(
      catchError(error => {
        console.error('Error fetching favorite movies:', error);
        return throwError(() => new Error('Failed to fetch favorite movies'));
      })
    );
  }

  getMoviesPaginated(page: number, limit: number): Observable<Movie[]> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    return this.http.get<Movie[]>(this.apiGetMoviesUrl, { params }).pipe(
      catchError(error => {
        console.error('Error fetching paginated movies:', error);
        return throwError(() => new Error('Failed to fetch paginated movies'));
      })
    );
  }
  addMovie(movieRequest: MovieRequest): Observable<Movie> {
    return this.http.post<Movie>(this.apiGetMoviesUrl, movieRequest);
  }

  uploadThumbnail(movieId: number, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
  
    const url = `${this.apiGetMoviesUrl}/upload-thumbnail/${movieId}`;
  
    return this.http.post(url, formData).pipe(
      catchError(error => {
        console.error('Error uploading thumbnail:', error);
        return throwError(() => new Error('Failed to upload thumbnail'));
      })
    );
  }
  updateMovie(id: number, movieRequest: MovieRequest): Observable<Movie> {
    const url = `${this.apiGetMoviesUrl}/${id}`;
    return this.http.put<Movie>(url, movieRequest).pipe(
      catchError(error => {
        console.error('Error updating movie:', error);
        return throwError(() => new Error('Failed to update movie'));
      })
    );
  }
  
  
  
  }