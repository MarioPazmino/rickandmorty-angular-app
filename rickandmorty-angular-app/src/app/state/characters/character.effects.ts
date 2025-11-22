import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, tap, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as CharacterActions from './character.actions';
import { CharacterContextService } from '../../core/services/character-context.service';
import { selectCurrentApi } from './character.selectors';

@Injectable()
export class CharacterEffects {

    loadCharacters$ = createEffect(() => this.actions$.pipe(
        ofType(CharacterActions.loadCharacters),
        mergeMap(action => {
            // Get the correct repository based on current state or service
            // Ideally we should use the service which is updated by the setApiType action
            // But to be safe, let's make sure the service is in sync or just use the service directly if it holds state.
            // Since we update the service in the setApiType effect, it should be fine.

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

    constructor(
        private actions$: Actions,
        private characterContext: CharacterContextService,
        private store: Store
    ) { }
}
