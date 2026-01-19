import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, signal, computed, WritableSignal, Signal, inject } from '@angular/core';
import { Film } from '../../shared/types/film';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class FilmsListService {
    private readonly apiUrl: string = 'http://localhost:3000/films';

    private readonly allFilms: WritableSignal<Film[]> = signal<Film[]>([]);
    private readonly searchQuery: WritableSignal<string> = signal<string>('');
    private readonly httpClient: HttpClient = inject(HttpClient);

    public readonly filteredFilms: Signal<Film[]> = computed(() => {
        const query: string = this.searchQuery().toLowerCase().trim();
        const films: Film[] = this.allFilms();

        if (!query) {
            return films;
        }

        return films.filter((film: Film) => film.name.toLowerCase().includes(query));
    });

    public readonly autocompleteOptions: Signal<Film[]> = computed(() => {
        const query: string = this.searchQuery().toLowerCase().trim();

        if (!query) {
            return [];
        }

        return this.filteredFilms().slice(0, 10);
    });

    public get(): Observable<Film[]> {
        return this.httpClient.get<Film[]>(this.apiUrl).pipe(catchError(this.handleError));
    }

    public setFilms(films: Film[]): void {
        this.allFilms.set(films);
    }

    public setSearchQuery(query: string): void {
        this.searchQuery.set(query);
    }

    public clearSearch(): void {
        this.searchQuery.set('');
    }

    private handleError(error: HttpErrorResponse): Observable<never> {
        console.error('Ошибка при загрузке фильмов:', error);
        return throwError((): Error => new Error('Не удалось загрузить фильмы'));
    }
}
