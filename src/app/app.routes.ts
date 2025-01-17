import { Routes } from '@angular/router';
import { SpellListComponent } from './spells/list/spell-list.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: SpellListComponent,
  },
  {
    path: 'spellbook',
    loadComponent: () =>
      import('./spells/spellbook/spellbook.component').then(
        (m) => m.SpellbookComponent,
      ),
  },
  {
    path: 'spell/:index',
    loadComponent: () =>
      import('./spells/detail/spell-detail.component').then(
        (m) => m.SpellDetailComponent,
      ),
  },
  { path: '**', redirectTo: '' },
];
