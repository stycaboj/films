import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, Signal, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FilmsListService } from '../services/films-list.service';
import { Film } from '../../shared/types/film';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
    selector: 'app-header',
    imports: [
        MatAutocompleteModule,
        MatInputModule,
        MatFormFieldModule,
        ReactiveFormsModule,
    ],
    templateUrl: './header.html',
    styleUrl: './header.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Header implements OnInit {
    protected searchControl: FormControl<string | null> = new FormControl<string>('');
    private readonly filmsListService: FilmsListService = inject(FilmsListService);
    private readonly destroyRef: DestroyRef = inject(DestroyRef);

    protected get autocompleteOptions(): Signal<Film[]> {
        return this.filmsListService.autocompleteOptions;
    }

    public ngOnInit(): void {
        this.searchControl.valueChanges
            .pipe(
                debounceTime(300),
                distinctUntilChanged(),
                takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: (value: string | null) => {
                    this.filmsListService.setSearchQuery(value || '');
                },
                error: (error: Error) => {
                    console.error(error);
                },
            });
    }
}
