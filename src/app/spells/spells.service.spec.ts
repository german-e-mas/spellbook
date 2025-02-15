import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { SpellsService } from './spells.service';
import { APIReference, APIReferenceList, Spell } from './types';
import { firstValueFrom } from 'rxjs';

describe('SpellsService', () => {
  let service: SpellsService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(SpellsService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get a spell by index', async () => {
    const index = 'fireball';
    const response = { index } as Spell;
    const responsePromise = firstValueFrom(service.get(index));

    const req = http.expectOne({
      method: 'GET',
      url: 'https://www.dnd5eapi.co/api/spells/fireball',
    });

    req.flush(response);

    expect(await responsePromise).toBe(response);
  });

  it('should get the list of spells', async () => {
    const response: APIReferenceList = {
      count: 2,
      results: [
        { index: 'fireball' },
        { index: 'magic-missile' },
      ] as APIReference[],
    };
    const responsePromise = firstValueFrom(service.list());

    const req = http.expectOne({
      method: 'GET',
      url: 'https://www.dnd5eapi.co/api/spells',
    });

    req.flush(response);

    expect(await responsePromise).toEqual(response.results);
  });
});
