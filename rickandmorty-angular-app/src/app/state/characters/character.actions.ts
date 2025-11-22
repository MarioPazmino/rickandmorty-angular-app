import { createAction, props } from '@ngrx/store';
import { Character, CharacterFilter, ApiResponse } from '../../core/models/character.model';
import { ApiType } from '../../core/services/character-context.service';

export const loadCharacters = createAction(
    '[Character List] Load Characters',
    props<{ page?: number; filter?: CharacterFilter }>()
);

export const loadCharactersSuccess = createAction(
    '[Character List] Load Characters Success',
    props<{ response: ApiResponse<Character> }>()
);

export const loadCharactersFailure = createAction(
    '[Character List] Load Characters Failure',
    props<{ error: any }>()
);

export const setApiType = createAction(
    '[Settings] Set API Type',
    props<{ apiType: ApiType }>()
);

export const selectCharacter = createAction(
    '[Character List] Select Character',
    props<{ character: Character }>()
);

export const toggleFavorite = createAction(
    '[Character List] Toggle Favorite',
    props<{ characterId: number }>()
);
