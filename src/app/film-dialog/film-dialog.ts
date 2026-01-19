import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Film } from '../../shared/types/film';

@Component({
    selector: 'app-film-dialog',
    imports: [MatDialogModule],
    templateUrl: './film-dialog.html',
    styleUrl: './film-dialog.scss',
})
export class FilmDialog {
    public readonly dialogRef = inject(MatDialogRef<FilmDialog>);
    public readonly data = inject<Film>(MAT_DIALOG_DATA);

    public closeDialog(): void {
        this.dialogRef.close();
    }
}
