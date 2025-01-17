import { Routes } from '@angular/router';
import { SpellListComponent } from './spell-list/spell-list.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: SpellListComponent,
  },
  {
    path: 'spellbook',
    loadComponent: () =>
      import('./spellbook/spellbook.component').then(
        (m) => m.SpellbookComponent,
      ),
  },
  {
    path: 'spell/:index',
    loadComponent: () =>
      import('./spell-detail/spell-detail.component').then(
        (m) => m.SpellDetailComponent,
      ),
  },
];
