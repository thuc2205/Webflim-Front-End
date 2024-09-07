// episode-request.ts
export interface  EpisodeRequest {
    movieId : number;
    title: string;
    description: string;
    duration: number;
    episodeNumber: string;
    releaseDate: string; // ISO date string
  }
  