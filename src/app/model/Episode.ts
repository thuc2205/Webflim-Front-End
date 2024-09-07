import {Movie} from './movie'
export interface EpisodeResponse {
    id: number;
    title: string;
    description: string;
    episodeNumber: string;
    duration: number;
    videoUrl: string;
    movie: Movie;
  }