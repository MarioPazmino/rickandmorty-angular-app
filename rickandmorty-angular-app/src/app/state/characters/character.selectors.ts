import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CharacterState } from './character.reducer';

export const selectCharacterState = createFeatureSelector<CharacterState>('characters');

export const selectAllCharacters = createSelector(
    selectCharacterState,
    (state) => state.characters
);

export const selectLoading = createSelector(
    selectCharacterState,
    (state) => state.loading
);

export const selectCurrentApi = createSelector(
    selectCharacterState,
    (state) => state.currentApi
);

export const selectSelectedCharacter = createSelector(
    selectCharacterState,
    (state) => state.selectedCharacter
);

export const selectFavorites = createSelector(
    selectCharacterState,
    (state) => state.favorites
);

export const selectCharacterInfo = createSelector(
    selectCharacterState,
    (state) => state.info
);
