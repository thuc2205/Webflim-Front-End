import { Component, OnInit } from '@angular/core';
import { Movie } from '../../model/movie';
import { MovieService } from '../../service/movieService';
import { FavoriteService } from '../../service/FavoriteService ';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { evironment } from '../../enviroment/evironment'; // Cập nhật tên tệp tin cấu hình môi trường
import { LocalStorageService } from '../../service/LocalStorageService';
import { EpisodeService } from '../../service/episodeService';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['../../assets/styles/style.scss']
})
export class MovieDetailComponent implements OnInit {

  movie!: Movie;
  errorMessage: string = '';
  username: string | null = null; // Thêm thuộc tính username
  isFavorite: boolean = false; // Trạng thái yêu thích

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute,
    private router: Router,
    private favoriteService: FavoriteService,
    private localStorageService: LocalStorageService,
    private EpisodeService: EpisodeService,

  ) {}

  ngOnInit(): void {
    // Lắng nghe sự kiện điều hướng hoàn tất và cuộn về đầu trang
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0); // Cuộn về đầu trang
      }
    });

    // Lấy username từ localStorage thông qua LocalStorageService
    this.username = this.localStorageService.getItem('username');

    // Lấy title từ queryParams khi component được khởi tạo
    this.route.queryParams.subscribe(params => {
      const title = params['title'];
      if (title) {
        this.searchMovieByTitle(title);
      }
    });

  }

  searchMovieByTitle(title: string): void {
    this.movieService.getMovieByName(title).subscribe({
      next: (data) => {
        if (data && data.title) {
          this.movie = {
            ...data,
            thumbnailUrl: `${evironment.apiBaseUrl}/movies/images/${data.thumbnailUrl}`
          };
          this.checkIfFavorite(); // Kiểm tra trạng thái yêu thích sau khi lấy dữ liệu movie
        } else {
          this.errorMessage = 'Movie data is incomplete.';
        }
      },
      error: (err) => {
        this.errorMessage = err.message;
      }
    });
  }

  checkIfFavorite(): void {
    if (this.username && this.movie && this.movie.title) {
      const request = {
        username: this.username,
        titleMovie: this.movie.title
      };

      this.favoriteService.findFavorite(request).subscribe({
        next: (existingFavorite) => {
          this.isFavorite = !!existingFavorite; // Cập nhật trạng thái yêu thích
        },
        error: (error) => {
          console.error('Error checking favorite status:', error);
        }
      });
    }
  }

  onWatchNowClick(): void {
    if (this.movie && this.movie.title) {
      this.EpisodeService.getEpisodesByTitle(this.movie.title).subscribe({
        next: (episodes) => {
          if (episodes.length > 0) {
            const firstEpisodeNumber = episodes[0].episodeNumber; // Get the episodeNumber of the first episode
            this.router.navigate(['/watching'], { queryParams: { title: this.movie.title, episodeNumber: firstEpisodeNumber } });
          } else {
            this.errorMessage = 'No episodes found for this movie.';
          }
        },
        error: (error) => {
          this.errorMessage = 'Error fetching episodes: ' + error.message;
        }
      });
    } else {
      this.errorMessage = 'Movie title is missing.';
    }
  }
  

  onAddToFavoritesClick(): void {
    if (this.username) {
      if (this.movie && this.movie.title) {
        const request = {
          username: this.username,
          titleMovie: this.movie.title
        };

        if (this.isFavorite) {
          // Nếu mục yêu thích đã tồn tại, gọi phương thức xóa
          this.favoriteService.removeFavorite(request).subscribe({
            next: () => {
              this.isFavorite = false; // Cập nhật trạng thái yêu thích
              alert('Đã xóa khỏi yêu thích');
              console.log('Movie removed from favorites');
            },
            error: (error) => {
              console.error('Error removing movie from favorites:', error);
            }
          });
        } else {
          alert('Thêm yêu thích thành công');
          // Nếu mục yêu thích chưa tồn tại, gọi phương thức thêm
          this.favoriteService.addFavorite(request).subscribe({
            next: (response) => {
                this.isFavorite = true;
                console.log('Movie added to favorites', response);
            },
            error: (error) => {
                if (error.error instanceof ErrorEvent) {
                    // Lỗi phía client hoặc mạng
                    console.error('Client-side error:', error.error.message);
                    alert('An error occurred on the client-side.');
                } else {
                    // Lỗi từ phía server
                    console.error('Server-side error:', error);
                    alert(error.error?.error || 'An error occurred on the server.');
                }
            }
        });
        
        }
      } else {
        this.errorMessage = 'Movie title is missing.';
      }
    } else {
      // Nếu username là null, thông báo và chuyển hướng đến trang đăng nhập
      alert('Bạn chưa đăng nhập. Vui lòng đăng nhập để thêm vào danh sách yêu thích.');
      this.router.navigate(['/login']);
    }
  }
}
