import { describe, it, expect } from 'vitest';
import { selectAllCharacters, selectLoading, selectSelectedCharacter, selectFavorites, selectCurrentApi, selectCharacterInfo } from './character.selectors';

describe('Character Selectors', () => {
    const mockState = {
        characters: {
            characters: [
                { id: 1, name: 'Rick', status: 'Alive', species: 'Human', type: '', gender: 'Male', origin: { name: 'Earth', url: '' }, location: { name: 'Earth', url: '' }, image: '', episode: [], url: '', created: '2017-11-04T18:48:46.250Z' },
                { id: 2, name: 'Morty', status: 'Alive', species: 'Human', type: '', gender: 'Male', origin: { name: 'Earth', url: '' }, location: { name: 'Earth', url: '' }, image: '', episode: [], url: '', created: '2017-11-04T18:50:21.651Z' }
            ],
            loading: false,
            error: null,
            selectedCharacter: null,
            favorites: [1],
            currentApi: 'REST',
            info: { count: 826, pages: 42, next: 'next', prev: null }
        }
    };

    it('should select all characters', () => {
        const result = selectAllCharacters(mockState);
        expect(result.length).toBe(2);
        expect(result[0].name).toBe('Rick');
    });

    it('should select loading state', () => {
        const result = selectLoading(mockState);
        expect(result).toBe(false);
    });

    it('should select selected character', () => {
        const result = selectSelectedCharacter(mockState);
        expect(result).toBeNull();
    });

    it('should select favorites', () => {
        const result = selectFavorites(mockState);
        expect(result).toEqual([1]);
    });

    it('should select current API', () => {
        const result = selectCurrentApi(mockState);
        expect(result).toBe('REST');
    });

    it('should select character info', () => {
        const result = selectCharacterInfo(mockState);
        expect(result?.count).toBe(826);
        expect(result?.pages).toBe(42);
    });
});
