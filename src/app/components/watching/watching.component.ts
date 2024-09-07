import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EpisodeResponse } from './../../model/Episode';
import { EpisodeService } from './../../service/episodeService';

@Component({
  selector: 'app-watching',
  templateUrl: './watching.component.html',
  styleUrls: ['../../assets/styles/style.scss']
})
export class WatchingComponent implements OnInit {
  episodes: EpisodeResponse[] = [];
  videoUrl: string = '';
  errorMessage: string | null = null;
  subtitleUrl: string = '';
  title: string | null = null;
  titleEpisode: string | null = null;
  episodeNumber: string | null = null;

  constructor(
    private episodeService: EpisodeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.title = params['title'];
      this.episodeNumber = params['episodeNumber']; // Lấy episodeNumber từ queryParams

      if (this.title && this.episodeNumber) {
        this.loadVideo(this.title, this.episodeNumber);
        console.log("video url " + this.videoUrl);
      } else {
        this.errorMessage = 'Title or episode number is missing.';
      }
    });
  }

  loadEpisodesBy(title: string): void {
    this.episodeService.getEpisodes(title).subscribe({
      next: (data) => {
        this.episodes = data;
      },
      error: (err) => {
        this.errorMessage = err.message || 'An error occurred while loading episodes.';
      }
    });
  }

  loadVideo(title: string, episodeNumber: string): void {
    this.episodeService.getEpisodes(title, episodeNumber).subscribe({
      next: (data) => {
        if (data.length > 0) {
          this.videoUrl = `http://localhost:8080/api/v1/episode/video/${data[0].videoUrl}`;
          this.titleEpisode =data[0].title;
          console.log('Video URL:', this.videoUrl); // Kiểm tra videoUrl
          this.loadEpisodesBy(title); // Optional: Load episodes if needed
        } else {
          this.errorMessage = 'No video data found for the specified title and episode number.';
        }
      },
      error: (err) => {
        this.errorMessage = err.message || 'An error occurred while loading the video.';
      }
    });
  }

  onEpisodeClick(episodeNumber: string): void {
    if (this.title) {
      this.router.navigate(['/watching'], {
        queryParams: {
          title: this.title,
          episodeNumber: episodeNumber
        }
      });
    }
  }
}
