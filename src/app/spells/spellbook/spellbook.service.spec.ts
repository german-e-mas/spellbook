import { TestBed } from '@angular/core/testing';

import { SpellbookService } from './spellbook.service';

class LocalStorageMock implements Storage {
  private store = new Map<string, string>();
  length: number = this.store.size;
  getItem(key: string) {
    return this.store.get(key) || null;
  }
  setItem(key: string, value: string) {
    this.store.set(key, value);
  }
  removeItem(key: string) {
    this.store.delete(key);
  }
  clear() {
    this.store.clear();
  }
  key(index: number): string | null {
    return `${this.store.size}`;
  }
}

describe('SpellbookService', () => {
  let service: SpellbookService;
  const baseSpells = ['magic-missile', 'fireball'];
  const localStorageMock = new LocalStorageMock();

  beforeEach(() => {
    localStorageMock.setItem('spells', JSON.stringify(baseSpells));
    const localStorageSpy = spyOnProperty(
      window,
      'localStorage',
      'get',
    ).and.returnValue(localStorageMock);
    TestBed.configureTestingModule({});
  });

  afterEach(() => {
    localStorageMock.clear();
  });

  it('should load the spells when created', () => {
    service = TestBed.inject(SpellbookService);
    expect(service.getSpells()).toEqual(baseSpells);
  });

  it('should add a new spell', () => {
    service = TestBed.inject(SpellbookService);
    service.add('shield');
    expect(service.getSpells()).toEqual([...baseSpells, 'shield']);
  });

  it('should remove a spell', () => {
    service = TestBed.inject(SpellbookService);
    service.remove('fireball');
    expect(service.getSpells()).toEqual(['magic-missile']);
  });
});
