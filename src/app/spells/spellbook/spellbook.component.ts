import { Component, inject, resource, signal } from '@angular/core';
import { SpellbookService } from './spellbook.service';
import { SpellsService } from '../spells.service';
import { catchError, firstValueFrom, forkJoin, of, tap } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-spellbook',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatProgressSpinnerModule,
    RouterLink,
  ],
  templateUrl: './spellbook.component.html',
  styleUrl: './spellbook.component.scss',
})
export class SpellbookComponent {
  private readonly spellbookService = inject(SpellbookService);
  private readonly spellsService = inject(SpellsService);

  readonly indices = signal<string[]>([]);
  readonly spellsResource = resource({
    request: () => this.indices(),
    loader: async () =>
      await firstValueFrom(
        this.indices().length === 0
          ? of([])
          : forkJoin(
              this.indices().map((idx) => {
                console.log('indices?', idx);
                return this.spellsService.get(idx);
              }),
            ).pipe(
              tap((val) => console.log(val)),
              catchError((err) => {
                console.log(err);
                return of(null);
              }),
            ),
      ),
  });

  /**
   * Use the spell indices to get the whole spell.
   */
  constructor() {
    this.refreshIndices();
  }

  /**
   * Remove from the spellbook.
   */
  remove(index: string) {
    this.spellbookService.remove(index);
    this.refreshIndices();
  }

  refreshIndices() {
    this.indices.set(this.spellbookService.getSpells());
  }
}
