import { describe, it, expect } from 'vitest';
import { characterReducer, initialState } from './character.reducer';
import * as CharacterActions from './character.actions';

describe('Character Reducer', () => {
    it('should return the initial state', () => {
        const action = { type: 'Unknown' } as any;
        const state = characterReducer(undefined, action);

        expect(state).toEqual(initialState);
    });

    it('should set loading to true on loadCharacters', () => {
        const action = CharacterActions.loadCharacters({ page: 1, filter: {} });
        const state = characterReducer(initialState, action);

        expect(state.loading).toBe(true);
    });

    it('should load characters successfully', () => {
        const mockResponse = {
            info: { count: 826, pages: 42, next: 'next', prev: null },
            results: [
                { id: 1, name: 'Rick', status: 'Alive', species: 'Human', type: '', gender: 'Male', origin: { name: 'Earth', url: '' }, location: { name: 'Earth', url: '' }, image: '', episode: [], url: '', created: '2017-11-04T18:48:46.250Z' }
            ]
        };

        const action = CharacterActions.loadCharactersSuccess({ response: mockResponse });
        const state = characterReducer(initialState, action);

        expect(state.loading).toBe(false);
        expect(state.characters.length).toBe(1);
        expect(state.info?.count).toBe(826);
    });

    it('should handle loadCharactersFailure', () => {
        const action = CharacterActions.loadCharactersFailure({ error: 'Error message' });
        const state = characterReducer(initialState, action);

        expect(state.loading).toBe(false);
        expect(state.error).toBe('Error message');
    });

    it('should select a character', () => {
        const character = { id: 1, name: 'Rick', status: 'Alive', species: 'Human', type: '', gender: 'Male', origin: { name: 'Earth', url: '' }, location: { name: 'Earth', url: '' }, image: '', episode: [], url: '', created: '2017-11-04T18:48:46.250Z' };
        const action = CharacterActions.selectCharacter({ character });
        const state = characterReducer(initialState, action);

        expect(state.selectedCharacter).toEqual(character);
    });

    it('should toggle favorite', () => {
        const action = CharacterActions.toggleFavorite({ characterId: 1 });
        const state = characterReducer(initialState, action);

        expect(state.favorites).toContain(1);

        const state2 = characterReducer(state, action);
        expect(state2.favorites).not.toContain(1);
    });

    it('should set API type', () => {
        const action = CharacterActions.setApiType({ apiType: 'GRAPHQL' });
        const state = characterReducer(initialState, action);

        expect(state.currentApi).toBe('GRAPHQL');
    });
});
