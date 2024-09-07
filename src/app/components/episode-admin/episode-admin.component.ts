import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EpisodeService } from '../../service/episodeService';
import { EpisodeResponse } from '../../model/Episode';
import { EpisodeRequest } from '../../model/EpisodeRequest';
import { EpisodeUpdateRequest } from '../../model/EpisodeUpdateRequest';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-episode-admin',
  templateUrl: './episode-admin.component.html',
  styleUrls: ['./episode-admin.component.scss']
})
export class EpisodeAdminComponent implements OnInit {
  title: string = '';
  movieId: number = 0;
  episodes: EpisodeResponse[] = [];
  episode: EpisodeRequest = {
    movieId: 0,
    title: '',
    description: '',
    duration: 0,
    episodeNumber: '',
    releaseDate: ''
  };
  videoFile: File | null = null;
  episodeToEdit: EpisodeResponse | null = null;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private episodeService: EpisodeService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.title = params['title'];
      this.movieId = +params['movieId']; // Convert to number

      if (this.title) {
        // Fetch episodes based on the title
        this.episodeService.getEpisodesByTitle(this.title).subscribe({
          next: (episodes) => {
            this.episodes = episodes;
            console.log('Episodes for title', this.title, ':', episodes);
          },
          error: (error) => {
            console.error('Error fetching episodes:', error);
          }
        });
      }
    });
  }

  onSubmit(): void {
    // Ensure movieId is set correctly
    this.episode.movieId = this.movieId;

    this.episodeService.addEpisode(this.episode).subscribe({
      next: (response: EpisodeResponse) => {
        console.log('Episode added successfully:', response);

        // Get the ID of the newly created episode
        const episodeId = response.id;

        // Upload video if selected
        if (this.videoFile) {
          this.episodeService.uploadVideo(episodeId, this.videoFile).subscribe({
            next: (uploadResponse) => {
              console.log('Video uploaded successfully:', uploadResponse);
              // Reload the episodes list after adding new episode
              this.ngOnInit();
              this.resetForm();
            },
            error: (uploadError) => {
              console.error('Error uploading video:', uploadError);
              this.errorMessage = 'An error occurred while uploading the video.';
            }
          });
        } else {
          // Reload the episodes list if no video is selected
          this.ngOnInit();
          this.resetForm();
        }
      },
      error: (error) => {
        console.error('Error adding episode:', error);
        this.errorMessage = 'An error occurred while adding the episode.';
      }
    });
  }

  onVideoFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.videoFile = file;
    } else {
      this.videoFile = null; // Clear file if none is selected
    }
  }

  private resetForm(): void {
    this.episode = {
      movieId: this.movieId,
      title: '',
      description: '',
      duration: 0,
      episodeNumber: '',
      releaseDate: ''
    }; // Reset the form
    this.videoFile = null; // Clear the file input
  }

  editEpisode(episode: EpisodeResponse): void {
    this.episodeToEdit = { ...episode }; // Create a copy to edit
  }

  updateEpisode(): void {
    if (this.episodeToEdit) {
      const episodeRequest: EpisodeUpdateRequest = {
        title: this.episodeToEdit.title,
        description: this.episodeToEdit.description,
        episodeNumber: this.episodeToEdit.episodeNumber,
        duration: this.episodeToEdit.duration,
        // Add any additional fields if needed
      };
  
      this.episodeService.updateEpisode(this.episodeToEdit.id, episodeRequest).subscribe({
        next: (response) => {
          console.log('Episode updated successfully:', response);
  
          if (this.videoFile) {
            this.episodeService.uploadVideo(this.episodeToEdit!.id, this.videoFile).subscribe({
              next: (uploadResponse) => {
                console.log('Video uploaded successfully:', uploadResponse);
                this.ngOnInit(); // Reload episodes after update
                this.episodeToEdit = null; // Clear the form
              },
              error: (uploadError) => {
                console.error('Error uploading video:', uploadError);
                this.errorMessage = 'An error occurred while uploading the video.';
              }
            });
          } else {
            this.ngOnInit(); // Reload episodes after update
            this.episodeToEdit = null; // Clear the form
          }
        },
        error: (error) => {
          console.error('Error updating episode:', error);
          this.errorMessage = 'An error occurred while updating the episode.';
        }
      });
    }
  }
  
  
  

  cancelEdit(): void {
    this.episodeToEdit = null; // Clear the form
  }
}
