// movie.ts
import { Genre } from './genre';  // Đảm bảo đường dẫn đúng và tệp genre.ts có thể được import

export interface Movie {
    id: number;
    title: string;
    description: string;
    release_date: string;  // Hoặc Date nếu bạn muốn xử lý dưới dạng đối tượng Date
    thumbnailUrl: string;
    viewCount: number;
    createdAt: Date;  // Hoặc Date
    genres: Genre[];

}
