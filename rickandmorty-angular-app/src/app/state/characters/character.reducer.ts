import { createReducer, on } from '@ngrx/store';
import { Character, ApiResponse } from '../../core/models/character.model';
import { ApiType } from '../../core/services/character-context.service';
import * as CharacterActions from './character.actions';

export interface CharacterState {
    characters: Character[];
    info: ApiResponse<Character>['info'] | null;
    loading: boolean;
    error: any;
    selectedCharacter: Character | null;
    favorites: number[]; // Store IDs of favorites
    currentApi: ApiType;
    currentPage: number;
    currentFilter: any;
}

export const initialState: CharacterState = {
    characters: [],
    info: null,
    loading: false,
    error: null,
    selectedCharacter: null,
    favorites: [],
    currentApi: 'REST',
    currentPage: 1,
    currentFilter: {}
};

export const characterReducer = createReducer(
    initialState,
    on(CharacterActions.loadCharacters, (state, { page, filter }) => ({
        ...state,
        loading: true,
        currentPage: page || state.currentPage,
        currentFilter: filter || state.currentFilter
    })),
    on(CharacterActions.loadCharactersSuccess, (state, { response }) => ({
        ...state,
        loading: false,
        characters: response.results,
        info: response.info
    })),
    on(CharacterActions.loadCharactersFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),
    on(CharacterActions.setApiType, (state, { apiType }) => ({
        ...state,
        currentApi: apiType
    })),
    on(CharacterActions.selectCharacter, (state, { character }) => ({
        ...state,
        selectedCharacter: character
    })),
    on(CharacterActions.toggleFavorite, (state, { characterId }) => {
        const isFav = state.favorites.includes(characterId);
        return {
            ...state,
            favorites: isFav
                ? state.favorites.filter(id => id !== characterId)
                : [...state.favorites, characterId]
        };
    })
);
