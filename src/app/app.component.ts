import { Component, inject, signal } from '@angular/core';
import {
  Event,
  NavigationEnd,
  Router,
  RouterEvent,
  RouterLink,
  RouterOutlet,
} from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { filter, map } from 'rxjs';

interface NavTab {
  link: string;
  label: string;
  icon: string;
  active: boolean;
}

@Component({
  selector: 'app-root',
  imports: [
    MatIconModule,
    MatTabsModule,
    MatToolbarModule,
    RouterLink,
    RouterOutlet,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private readonly router = inject(Router);

  readonly navigationTabs = signal<NavTab[]>([
    {
      link: '/',
      label: 'Spell List',
      icon: 'list',
      active: false,
    },
    {
      link: '/spellbook',
      label: 'Spellbook',
      icon: 'book',
      active: false,
    },
  ]);

  title = 'Dungeons and Dragons 5th Edition Spells';

  constructor() {
    this.router.events
      .pipe(
        filter(
          (e: Event | RouterEvent): e is RouterEvent =>
            e instanceof NavigationEnd,
        ),
        map((e) => (e instanceof NavigationEnd ? e.urlAfterRedirects : e.url)),
      )
      .subscribe({
        next: (activeUrl) => {
          this.navigationTabs.update((tabs) => {
            tabs.forEach((tab) => (tab.active = false));
            const activeTab = tabs.find((tab) => tab.link === activeUrl);
            if (activeTab) {
              activeTab.active = true;
            }
            return tabs;
          });
        },
      });
  }
}
