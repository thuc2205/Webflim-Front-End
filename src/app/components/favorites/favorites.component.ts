import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../service/movieService';
import { Movie } from '../../model/movie';
import { Router } from '@angular/router';
import { evironment } from '../../enviroment/evironment';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['../../assets/styles/style.scss']
})
export class FavoritesComponent implements OnInit {
  favoriteMovies: Movie[] = [];
  username: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.username = params.get('username'); // Lấy username từ URL

      if (this.username) {
        this.movieService.getFavoriteMoviesByUser(this.username).subscribe({
          next: (response: any) => {
            this.favoriteMovies = response.map((movie: any) => {
              return {
                ...movie,
                thumbnailUrl: `${evironment.apiBaseUrl}/movies/images/${movie.thumbnailUrl}` // Cập nhật URL ảnh
              };
            });
          },
          error: (error: any) => {
            console.error('Error fetching favorite movies:', error);
          }
        });
      } else {
        // Nếu không có username, điều hướng về trang đăng nhập
        this.router.navigate(['/login']);
      }
    });
  }

  onMovieClick(title: string): void {
    this.router.navigate(['/movie-detail'], { queryParams: { title: title } });
  }
}
