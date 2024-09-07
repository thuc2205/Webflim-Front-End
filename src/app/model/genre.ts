// genre.ts
export interface Genre {
    name: string;
}

export interface GenreResponse {
    genres: Genre[];
    totalPages: number;
    totalElements: number;
    currentPage: number;
    pageSize: number;
}

export interface genreRequest {
    name: string;
}

