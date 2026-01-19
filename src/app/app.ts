import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Header } from "./header/header";
import { FilmsList } from "./films-list/films-list";

@Component({
    selector: 'app-root',
    imports: [Header, FilmsList],
    templateUrl: './app.html',
    styleUrl: './app.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {}
