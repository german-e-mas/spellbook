import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of, throwError } from 'rxjs';

import { SpellListComponent } from './spell-list.component';
import { SpellsService } from '../spells.service';
import { APIReference } from '../types';

describe('SpellListComponent', () => {
  let component: SpellListComponent;
  let fixture: ComponentFixture<SpellListComponent>;
  const spellsServiceSpy = jasmine.createSpyObj('SpellsService', ['list']);
  const snackbarSpy = jasmine.createSpyObj('MatSbackbar', ['open']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpellListComponent],
      providers: [
        {
          provide: SpellsService,
          useValue: spellsServiceSpy,
        },
        {
          provide: MatSnackBar,
          useValue: snackbarSpy,
        },
      ],
    }).compileComponents();
  });

  it('should create', () => {
    fixture = TestBed.createComponent(SpellListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should get the list of spells', () => {
    const response = [
      { index: 'fireball' },
      { index: 'magic-missile' },
    ] as APIReference[];
    spellsServiceSpy.list.and.returnValue(of(response));

    fixture = TestBed.createComponent(SpellListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(spellsServiceSpy.list).toHaveBeenCalled();
    expect(component.spellList()).toEqual(response);
  });

  it('should show a snackbar if the request failed', () => {
    spellsServiceSpy.list.and.returnValue(throwError(() => new Error('error')));

    fixture = TestBed.createComponent(SpellListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(spellsServiceSpy.list).toHaveBeenCalled();
    expect(snackbarSpy.open).toHaveBeenCalled();
  });
});
