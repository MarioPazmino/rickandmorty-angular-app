import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as CharacterActions from './character.actions';
import { CharacterContextService } from '../../core/services/character-context.service';

@Injectable()
export class CharacterEffects {
    private actions$ = inject(Actions);
    private characterContext = inject(CharacterContextService);
    private store = inject(Store);

    loadCharacters$ = createEffect(() => this.actions$.pipe(
        ofType(CharacterActions.loadCharacters),
        mergeMap(action => {
            return this.characterContext.getRepository().getAll(action.page, action.filter).pipe(
                map(response => CharacterActions.loadCharactersSuccess({ response })),
                catchError(error => of(CharacterActions.loadCharactersFailure({ error })))
            );
        })
    ));

    // When API type changes, update the context service and reload characters
    setApiType$ = createEffect(() => this.actions$.pipe(
        ofType(CharacterActions.setApiType),
        tap(action => this.characterContext.setApi(action.apiType)),
        map(() => CharacterActions.loadCharacters({ page: 1 })) // Reload with new API
    ));
}
