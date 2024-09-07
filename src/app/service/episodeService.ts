import { evironment} from '../enviroment/evironment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams,HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from '../model/movie';
import { EpisodeResponse} from '../model/Episode';
import { EpisodeRequest} from '../model/EpisodeRequest';
import { EpisodeUpdateRequest} from '../model/EpisodeUpdateRequest';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
    providedIn: 'root',
  })
  export class EpisodeService {
    private apiGetEpisodesUrl = `${evironment.apiBaseUrl}/episode`;
    private apiGetEpisodesUrlget = `${evironment.apiBaseUrl}/episode/movie`;

    constructor(private http: HttpClient) { }
  
    getEpisodes(title: String, episodeNumber?: string): Observable<EpisodeResponse[]> {
      let params = new HttpParams().set('title', title.toString());
      if (episodeNumber) {
        params = params.set('episodeNumber', episodeNumber);
      }
  
      return this.http.get<EpisodeResponse[]>(this.apiGetEpisodesUrl, { params }).pipe(
        catchError(error => {
          console.error('Error fetching episodes:', error);
          return throwError(() => new Error('Error fetching episodes'));
        })
      );
    }
    getEpisodesBy(title: String, episodeNumber?: string): Observable<EpisodeResponse[]> {
        const url = `${this.apiGetEpisodesUrl}?title=${title}` + (episodeNumber ? `&episodeNumber=${episodeNumber}` : '');
        return this.http.get<EpisodeResponse[]>(url);
      }

      getEpisodesByTitle(title: string): Observable<EpisodeResponse[]> {
        const url = `${this.apiGetEpisodesUrlget}/${encodeURIComponent(title)}`;
        return this.http.get<EpisodeResponse[]>(url).pipe(
          catchError(error => {
            console.error('Error fetching episodes:', error);
            return throwError(() => new Error('Error fetching episodes'));
          })
        );
      }

      addEpisode(episode: EpisodeRequest): Observable<any> {
        return this.http.post<any>(this.apiGetEpisodesUrl, episode);
      }
      updateEpisode(id: number, episode: EpisodeUpdateRequest): Observable<EpisodeResponse> {
        return this.http.put<EpisodeResponse>(`${this.apiGetEpisodesUrl}/${id}`, episode).pipe(
          catchError(error => {
            console.error('Error updating episode:', error);
            return throwError(() => new Error('Error updating episode'));
          })
        );
      }

      uploadVideo(episodeId: number, file: File): Observable<any> {
        const formData = new FormData();
        formData.append('file', file);
      
        return this.http.post<any>(`${this.apiGetEpisodesUrl}/upload/${episodeId}`, formData).pipe(
          catchError(error => {
            console.error('Error uploading video:', error);
            return throwError(() => new Error('Error uploading video'));
          })
        );
      }
      
  }