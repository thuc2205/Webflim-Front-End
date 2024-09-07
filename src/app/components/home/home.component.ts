import { Component, OnInit } from '@angular/core';
import { Movie } from '../../model/movie';  // Import Movie model
import { Genre } from '../../model/genre';
import {MovieService} from '../../service/movieService';
import { evironment} from '../../enviroment/evironment';
import { response } from 'express';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['../../assets/styles/style.scss'],
  standalone: false,  // Thêm dòng này

})

export class HomeComponent implements OnInit {
  top3Movies: Movie[] = [];
  genre: Genre[] = [];

  constructor(private movieService: MovieService,private router: Router) {}

  ngOnInit(): void {
    this.movieService.getTop3Movies().subscribe({
      next: (response: any) => {
        // Giả sử response chứa danh sách các phim
        this.top3Movies = response.map((movie: any) => {

          debugger
          return {
            ...movie,
            thumbnailUrl: `${evironment.apiBaseUrl}/movies/images/${movie.thumbnailUrl}` // Cập nhật URL ảnh
          };
        });
      },
      error: (error: any) => {
        console.error('Error fetching movies:', error);
      }
    });
  }
  onMovieClick(title: string): void {
    this.router.navigate(['/movie-detail'], { queryParams: { title: title } });
  }
}
