import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { SpellDetailComponent } from './spell-detail.component';
import { SpellsService } from '../spells.service';
import { ActivatedRoute } from '@angular/router';
import { Spell } from '../types';

describe('SpellDetailComponent', () => {
  let component: SpellDetailComponent;
  let fixture: ComponentFixture<SpellDetailComponent>;

  const spellsServiceSpy = jasmine.createSpyObj('SpellsService', ['get']);
  const activatedRouteSpy = jasmine.createSpyObj(
    'ActivatedRoute',
    {},
    { snapshot: { params: { index: 'fireball' } } },
  );

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpellDetailComponent],
      providers: [
        {
          provide: SpellsService,
          useValue: spellsServiceSpy,
        },
        {
          provide: ActivatedRoute,
          useValue: activatedRouteSpy,
        },
      ],
    }).compileComponents();
  });

  it('should create', () => {
    fixture = TestBed.createComponent(SpellDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should get the spell', async () => {
    const spell = {
      name: 'Fireball',
      level: 3,
      school: { name: 'Evocation' },
      ritual: false,
      desc: ['1st paragraph', '2nd paragraph'],
      range: '150',
      duration: 'instantaneous',
      concentration: false,
      area_of_effect: { type: 'sphere', size: 20 },
      damage: { damage_type: { name: 'Fire' } },
    } as Spell;
    spellsServiceSpy.get.and.returnValue(of(spell));
    fixture = TestBed.createComponent(SpellDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.spellResource.value()).toBeUndefined();
    expect(component.spellResource.isLoading()).toEqual(true);

    await fixture.whenStable();

    expect(component.spellResource.value()).toEqual(spell);
    expect(component.spellResource.isLoading()).toEqual(false);
  });

  it('should have an error if the request failed', async () => {
    const error = new Error('Test error');
    spellsServiceSpy.get.and.throwError(error);
    fixture = TestBed.createComponent(SpellDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.spellResource.value()).toBeUndefined();
    expect(component.spellResource.isLoading()).toEqual(true);

    await fixture.whenStable();

    expect(component.spellResource.error()).toEqual(error);
  });
});
