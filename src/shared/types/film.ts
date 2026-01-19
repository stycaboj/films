export interface Film {
    id: number;
    name: string;
    image: string;
    year: number;
    country: string,
    genres: string[];
    director: string;
    rating: number;
    description?: string;
}
