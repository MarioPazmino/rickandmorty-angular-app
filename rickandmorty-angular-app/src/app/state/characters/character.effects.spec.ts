import { TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { Observable, of, throwError, firstValueFrom } from 'rxjs';
import { CharacterEffects } from './character.effects';
import { CharacterContextService } from '../../core/services/character-context.service';
import * as CharacterActions from './character.actions';
import { Action } from '@ngrx/store';

describe('CharacterEffects', () => {
    let actions$: Observable<Action>;
    let effects: CharacterEffects;
    let contextServiceMock: any;

    beforeEach(() => {
        contextServiceMock = {
            getRepository: vi.fn(() => ({
                getAll: vi.fn(() => of({
                    info: { count: 826, pages: 42, next: 'next', prev: null },
                    results: [
                        { id: 1, name: 'Rick', status: 'Alive', species: 'Human', type: '', gender: 'Male', origin: { name: 'Earth', url: '' }, location: { name: 'Earth', url: '' }, image: '', episode: [], url: '', created: '2017-11-04T18:48:46.250Z' }
                    ]
                }))
            }))
        };

        TestBed.configureTestingModule({
            providers: [
                CharacterEffects,
                provideMockActions(() => actions$),
                provideMockStore({ initialState: {} }),
                { provide: CharacterContextService, useValue: contextServiceMock }
            ]
        });

        effects = TestBed.inject(CharacterEffects);
    });

    it('should be created', () => {
        expect(effects).toBeTruthy();
    });

    it('should return loadCharactersSuccess on successful load', async () => {
        const action = CharacterActions.loadCharacters({ page: 1, filter: {} });
        actions$ = of(action);

        const result = await firstValueFrom(effects.loadCharacters$);
        expect(result.type).toBe('[Character List] Load Characters Success');
    });

    it('should return loadCharactersFailure on error', async () => {
        contextServiceMock.getRepository = vi.fn(() => ({
            getAll: vi.fn(() => throwError(() => new Error('API Error')))
        }));

        const action = CharacterActions.loadCharacters({ page: 1, filter: {} });
        actions$ = of(action);

        const result = await firstValueFrom(effects.loadCharacters$);
        expect(result.type).toBe('[Character List] Load Characters Failure');
    });
});
