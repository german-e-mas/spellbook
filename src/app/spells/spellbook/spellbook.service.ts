import { Injectable } from '@angular/core';

/**
 * Service used to track your spellbook, which is the collection
 * of spells you know.
 *
 * This should be likely kept in state on a different approach (like ngrx).
 * It uses localhost for persistance.
 */
@Injectable({
  providedIn: 'root',
})
export class SpellbookService {
  /**
   * Spells in the book are a set of indices.
   */
  private spells = new Set<string>();

  /**
   * Local Storage key.
   */
  private readonly storageKey = 'spells';

  /**
   * Load all spells upon construction.
   */
  constructor() {
    this.load();
  }

  /**
   * Return all spell indices.
   */
  getSpells() {
    return [...this.spells.values()];
  }

  /**
   * Add a spell to the book.
   */
  add(index: string) {
    this.spells.add(index);
    this.save();
  }

  /**
   * Remove a spell from the book.
   */
  remove(index: string) {
    this.spells.delete(index);
    this.save();
  }

  /**
   * Load all stored spells
   */
  private load() {
    const spellString = localStorage.getItem(this.storageKey);
    if (spellString) {
      const spells: string[] = JSON.parse(spellString);
      this.spells = new Set(spells);
    }
  }

  /**
   * Persist the information.
   */
  private save() {
    localStorage.setItem(
      this.storageKey,
      JSON.stringify([...this.spells.values()]),
    );
  }
}
