import { Component, inject, resource } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { firstValueFrom } from 'rxjs';

import { SpellsService } from '../spells.service';

@Component({
  selector: 'app-spell-detail',
  imports: [
    CommonModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './spell-detail.component.html',
  styleUrl: './spell-detail.component.scss',
})
export class SpellDetailComponent {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly spellsService = inject(SpellsService);
  readonly spellIndex = this.activatedRoute.snapshot.params['index'];
  readonly spellResource = resource({
    loader: async () =>
      await firstValueFrom(this.spellsService.get(this.spellIndex)),
  });
}
