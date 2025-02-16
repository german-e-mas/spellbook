import {
  Component,
  inject,
  linkedSignal,
  resource,
  signal,
} from '@angular/core';
import { SpellbookService } from './spellbook.service';
import { SpellsService } from '../spells.service';
import { firstValueFrom, forkJoin, of } from 'rxjs';
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

  /**
   * Signal of spell indices. Obtained once upon creation.
   */
  readonly indices = signal<string[]>([]);

  /**
   * Resource to handle the conversion between indices and actual spells.
   */
  readonly spellsResource = resource({
    request: () => this.indices(),
    loader: async () =>
      await firstValueFrom(
        this.indices().length === 0
          ? of([])
          : forkJoin(this.indices().map((idx) => this.spellsService.get(idx))),
      ),
  });

  /**
   * Linked Signal to keep track of the spells without having to make
   * a request each time the indices change.
   */
  readonly spells = linkedSignal(() => this.spellsResource.value());

  /**
   * Use the spell indices to get the whole spell.
   */
  constructor() {
    this.indices.set(this.spellbookService.getSpells());
  }

  /**
   * Remove from the spellbook.
   */
  remove(index: string) {
    this.spells.update((spells) => {
      const spellIndex = spells?.findIndex((spell) => spell.index === index);
      if (spellIndex) {
        spells?.splice(spellIndex, 1);
        this.spellbookService.remove(index);
      }

      return spells;
    });
  }
}
