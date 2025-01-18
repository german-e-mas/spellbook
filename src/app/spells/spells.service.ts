import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { APIReference, APIReferenceList, Spell } from './types';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpellsService {
  private readonly baseUrl = 'https://www.dnd5eapi.co';
  private readonly http = inject(HttpClient);

  /**
   * Get a single spell.
   *
   * @param index The spell to get.
   * @returns An observable of the Spell.
   */
  get(index: string): Observable<Spell> {
    const url = `${this.baseUrl}/api/spells/${index}`;
    return this.http.get<Spell>(url);
  }

  /**
   * Get a list of spells.
   *
   * @returns An observable of the list of spells.
   */
  list(): Observable<APIReference[]> {
    const url = `${this.baseUrl}/api/spells`;
    return this.http
      .get<APIReferenceList>(url)
      .pipe(map((response) => response.results));
  }
}
