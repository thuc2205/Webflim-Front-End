  import { Component, OnInit } from '@angular/core';
  import { MovieService } from '../../service/movieService'; 
  import { EpisodeService } from '../../service/episodeService'; 
  import { Router } from '@angular/router';
  import { MovieRequest } from './../../model/MovieRequest';
  import { Movie } from './../../model/movie';
  import { evironment } from '../../enviroment/evironment';

  @Component({
    selector: 'app-movie-admin',
    templateUrl: './movie-admin.component.html',
    styleUrls: ['./movie-admin.component.scss']
  })
  export class MovieAdminComponent implements OnInit {
    movies: Movie[] = [];
    totalPages: number = 0;
    currentPage: number = 0;
    pageSize: number = 5;
    movieToEdit: Movie | null = null;
    movieId: number | null = null; // Để lưu movieId

    newMovie: MovieRequest = {
      title: '',
      description: '',
      release_date: '',
    };
    thumbnailFile: File | null = null;

    constructor(private movieService: MovieService,private episodeService: EpisodeService, private router: Router) {}

    ngOnInit(): void {
      this.loadMovies();
    }

    loadMovies(page: number = 0): void {
      this.movieService.getMoviesPaginated(page, this.pageSize).subscribe({
        next: (data: Movie[]) => {
          this.movies = data.map(movie => ({
            ...movie,
            thumbnailUrl: `${evironment.apiBaseUrl}/movies/images/${movie.thumbnailUrl}`
          }));
          this.currentPage = page;
        },
        error: (error: any) => {
          console.error('Error fetching movies:', error);
        }
      });
    }

    goToPage(page: number): void {
      if (page >= 0 && page < this.totalPages) {
        this.loadMovies(page);
      }
    }

    addMovie(): void {
      this.movieService.addMovie(this.newMovie).subscribe({
        next: (movie: Movie) => {
          console.log('Movie added successfully:', movie);

          if (this.thumbnailFile) {
            this.movieService.uploadThumbnail(movie.id, this.thumbnailFile).subscribe({
              next: () => {
                console.log('Thumbnail uploaded successfully');
                this.loadMovies(); // Reload movies to include new movie
              },
              error: (error: any) => {
                console.error('Error uploading thumbnail:', error);
                this.loadMovies(); // Reload movies even if thumbnail upload fails
              }
            });
          } else {
            this.loadMovies(); // Reload movies if no thumbnail
          }

          this.resetForm();
        },
        error: (error: any) => {
          console.error('Error adding movie:', error);
        }
      });
    }

    editMovie(movie: Movie): void {
      this.movieToEdit = { ...movie }; // Clone the movie to edit
      this.thumbnailFile = null; // Reset thumbnail file when entering edit mode

      // Ensure release_date is in YYYY-MM-DD format
      if (this.movieToEdit.release_date) {
        this.movieToEdit.release_date = this.formatDateForInput(this.movieToEdit.release_date);
      }
    }

    formatDateForInput(dateString: string): string {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = ('0' + (date.getMonth() + 1)).slice(-2);
      const day = ('0' + date.getDate()).slice(-2);
      return `${year}-${month}-${day}`;
    }

    updateMovie(): void {
      if (this.movieToEdit) {
        // Update movie details
        this.movieService.updateMovie(this.movieToEdit.id, this.movieToEdit).subscribe({
          next: (updatedMovie: Movie) => {
            console.log('Movie updated successfully:', updatedMovie);
    
            // Only upload thumbnail if a file is selected
            if (this.thumbnailFile) {
              this.movieService.uploadThumbnail(updatedMovie.id, this.thumbnailFile).subscribe({
                next: () => {
                  console.log('Thumbnail updated successfully');
                  this.loadMovies(); // Refresh the movie list after update
                },
                error: (error: any) => {
                  console.error('Error updating thumbnail:', error);
                  this.loadMovies(); // Refresh the movie list even if thumbnail update fails
                }
              });
            } else {
              this.loadMovies(); // Refresh the movie list if no new thumbnail
            }
    
            // Reset edit mode
            this.movieToEdit = null;
            this.thumbnailFile = null; // Clear selected file
          },
          error: (error: any) => {
            console.error('Error updating movie:', error);
          }
        });
      }
    }
    
    onThumbnailSelected(event: any): void {
      const file = event.target.files[0];
      if (file) {
        this.thumbnailFile = file;
      } else {
        this.thumbnailFile = null; // Clear file if none is selected
      }
    }
    
    

    cancelEdit(): void {
      this.movieToEdit = null; // Exit edit mode
    }

    resetForm(): void {
      this.newMovie = {
        title: '',
        description: '',
        release_date: '',
      };
      this.thumbnailFile = null; // Reset thumbnail
    }

    addEpisode(movieId: number, title: string): void {
      // Call the service method to fetch episodes by title
      this.episodeService.getEpisodesByTitle(title).subscribe({
        next: (episodes) => {
          console.log('Episodes fetched successfully:', episodes);
          // Navigate to EpisodeAdminComponent with the title as a query parameter
          this.router.navigate(['/episode'], { queryParams: { title } });
          this.router.navigate(['/episode'], { queryParams: { movieId, title } });

        },
        error: (error) => {
          console.error('Error fetching episodes:', error);
        }
      });
    }

  }
