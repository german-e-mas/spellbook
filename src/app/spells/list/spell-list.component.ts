import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterLink } from '@angular/router';
import { finalize } from 'rxjs';

import { APIReference } from '../types';
import { SpellsService } from '../spells.service';

@Component({
  selector: 'app-spell-list',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatProgressSpinnerModule,
    RouterLink,
  ],
  templateUrl: './spell-list.component.html',
  styleUrl: './spell-list.component.scss',
})
export class SpellListComponent {
  private readonly spellsService = inject(SpellsService);
  readonly snackbar = inject(MatSnackBar);

  readonly loading = signal<boolean>(true);
  readonly spellList = signal<APIReference[]>([]);

  constructor() {
    this.getSpells();
  }

  getSpells() {
    this.loading.set(true);

    this.spellsService
      .list()
      .pipe(
        finalize(() => {
          this.loading.set(false);
        }),
      )
      .subscribe({
        next: (spells) => {
          this.spellList.set(spells);
        },
        error: (err) => {
          this.snackbar.open('Error getting the list of spells', 'OK');
        },
      });
  }

  addToSpellbook(index: string) {
    this.snackbar.open('Added to your spellbook', 'OK', {
      duration: 3000,
    });
  }
}
