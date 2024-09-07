  import { Component, OnInit } from '@angular/core';
  import { GenreService } from '../../service/GenreService'; // Adjust the import path if needed
  import { GenreResponse, Genre } from './../../model/genre'; // Ensure these interfaces match the data structure

  @Component({
    selector: 'app-genre-adminn',
    templateUrl: './genre-adminn.component.html',
    styleUrls: ['./genre-adminn.component.scss']
  })
  export class GenreAdminnComponent implements OnInit {
    genreResponse: GenreResponse = { genres: [], totalPages: 0, totalElements: 0, currentPage: 0, pageSize: 10 };
    newGenre: Genre = { name: '' };
    editGenreName: string = '';
    genreToEdit: string | null = null;

    constructor(private genreService: GenreService) { }

    ngOnInit(): void {
      this.loadGenres();
    }

    loadGenres(page: number = 0, limit: number = 10): void {
      this.genreService.getAllGenres(page, limit).subscribe(data => {
        this.genreResponse = data;
      }, error => {
        console.error('Error loading genres:', error);
      });
    }

    goToPage(page: number): void {
      if (page >= 0 && page < this.genreResponse.totalPages) {
        this.loadGenres(page, this.genreResponse.pageSize);
      }
    }

    addGenre(): void {
      if (this.newGenre.name.trim()) {
        this.genreService.addGenre(this.newGenre).subscribe({
          next: (response) => {
            console.log('Genre added successfully:', response);
            this.loadGenres(); // Reload genres to reflect the new addition
            this.newGenre = { name: '' }; // Reset form
          },
          error: (error) => {
            console.error('Error adding genre:', error);
          }
        });
      } else {
        alert('Vui lòng nhập tên danh mục.');
      }
    }

    startEditing(name: string): void {
      this.genreToEdit = name;
      const genre = this.genreResponse.genres.find(g => g.name === name);
      if (genre) {
        this.editGenreName = genre.name;
      }
    }

    updateGenre(name: string): void {
      if (this.genreToEdit && this.editGenreName.trim()) {
        this.genreService.updateGenre(this.genreToEdit, { name: this.editGenreName }).subscribe({
          next: (response) => {
            console.log('Genre updated successfully:', response);
            this.loadGenres(); // Reload genres to reflect the update
            this.cancelEditing();
          },
          error: (error) => {
            console.error('Error updating genre:', error);
          }
        });
      } else {
        alert('Vui lòng nhập tên danh mục.');
      }
    }

    cancelEditing(): void {
      this.genreToEdit = null;
      this.editGenreName = '';
    }

    deleteGenre(name: string): void {
      const confirmed = window.confirm(`Bạn có chắc chắn muốn xóa danh mục "${name}" không?`);
      if (confirmed) {
        this.genreService.deleteGenre(name).subscribe({
          next: () => {
            console.log('Genre deleted successfully');
            this.loadGenres(); // Reload genres to reflect the deletion
          },
          error: (error) => {
            console.error('Error deleting genre:', error);
          }
        });
      }
    }

    get pagesArray(): number[] {
      return Array.from({ length: this.genreResponse.totalPages }, (_, i) => i);
    }
  }
