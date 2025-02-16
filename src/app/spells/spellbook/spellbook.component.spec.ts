import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { SpellbookComponent } from './spellbook.component';
import { SpellsService } from '../spells.service';
import { SpellbookService } from './spellbook.service';
import { Spell } from '../types';

describe('SpellbookComponent', () => {
  let component: SpellbookComponent;
  let fixture: ComponentFixture<SpellbookComponent>;
  const spellbookServiceSpy = jasmine.createSpyObj('SpellbookService', [
    'getSpells',
    'remove',
  ]);
  const spellsServiceSpy = jasmine.createSpyObj('SpellsService', ['get']);

  beforeEach(async () => {
    // Reset spied values.
    spellbookServiceSpy.getSpells.and.callThrough();
    spellbookServiceSpy.remove.and.callThrough();
    spellsServiceSpy.get.and.callThrough();

    await TestBed.configureTestingModule({
      imports: [SpellbookComponent],
      providers: [
        { provide: SpellsService, useValue: spellsServiceSpy },
        { provide: SpellbookService, useValue: spellbookServiceSpy },
      ],
    }).compileComponents();
  });

  afterEach(() => {
    // Reset spies calls.
    spellbookServiceSpy.getSpells.calls.reset();
    spellbookServiceSpy.remove.calls.reset();
    spellsServiceSpy.get.calls.reset();
  });

  it('should create', () => {
    fixture = TestBed.createComponent(SpellbookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should load an empty spellbook', async () => {
    spellbookServiceSpy.getSpells.and.returnValue([]);
    fixture = TestBed.createComponent(SpellbookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.spellsResource.isLoading()).toBe(true);
    expect(component.spellsResource.value()).toBe(undefined);
    expect(spellbookServiceSpy.getSpells).toHaveBeenCalled();

    await fixture.whenStable();

    expect(component.spellsResource.isLoading()).toBe(false);
    expect(component.spellsResource.value()).toEqual([]);
    expect(spellsServiceSpy.get).not.toHaveBeenCalled();
  });

  it('should load all spells in the spellbook', async () => {
    const indices = ['magic-missile', 'fireball', 'shield'];
    const spells = indices.map((index) => ({ index }) as Spell);
    spellbookServiceSpy.getSpells.and.returnValue(indices);
    indices.forEach((index) => {
      spellsServiceSpy.get
        .withArgs(index)
        .and.returnValue(of({ index } as Spell));
    });
    fixture = TestBed.createComponent(SpellbookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.spellsResource.isLoading()).toBe(true);
    expect(component.spellsResource.value()).toBe(undefined);
    indices.forEach((index) =>
      expect(spellsServiceSpy.get).toHaveBeenCalledWith(index),
    );

    await fixture.whenStable();

    expect(component.spellsResource.isLoading()).toBe(false);
    expect(component.spellsResource.value()).toEqual(spells);
    expect(component.spellsResource.error()).toBe(undefined);
  });

  it('should remove a spell from the spellbook', async () => {
    const indices = ['magic-missile', 'fireball', 'shield'];
    const toRemove = 'fireball';

    spellbookServiceSpy.getSpells.and.returnValue(indices);
    indices.forEach((index) => {
      spellsServiceSpy.get
        .withArgs(index)
        .and.returnValue(of({ index } as Spell));
    });
    fixture = TestBed.createComponent(SpellbookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.spells()).toEqual(
      indices.map((index) => ({ index }) as Spell),
    );

    component.remove(toRemove);
    await fixture.whenStable();

    indices.splice(indices.indexOf(toRemove), 1);

    const expectedSpells = indices.map((index) => ({ index }) as Spell);
    expect(spellbookServiceSpy.remove).toHaveBeenCalledWith(toRemove);
    expect(component.spells()).toEqual(expectedSpells);
  });
});
