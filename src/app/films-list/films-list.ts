import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, Signal } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Film } from '../../shared/types/film';
import { FilmsListService } from '../services/films-list.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FilmDialog } from '../film-dialog/film-dialog';

@Component({
    selector: 'app-films-list',
    imports: [MatDialogModule],
    templateUrl: './films-list.html',
    styleUrl: './films-list.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilmsList implements OnInit {
    private readonly filmsListService: FilmsListService = inject(FilmsListService);
    private readonly destroyRef: DestroyRef = inject(DestroyRef);
    private readonly dialog: MatDialog = inject(MatDialog);

    protected get films(): Signal<Film[]> {
        return this.filmsListService.filteredFilms;
    }

    public ngOnInit(): void {
        this.filmsListService.get()
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
            next: (films: Film[]) => {
                this.filmsListService.setFilms(films);
            },
            error: (error: Error) => {
                console.error(error);
            },
        });
    }

    protected openFilmDialog(film: Film): void {
        this.dialog.open(FilmDialog, {
            data: film,
            width: '100vw',
            maxWidth: '60rem',
        });
    }
}
