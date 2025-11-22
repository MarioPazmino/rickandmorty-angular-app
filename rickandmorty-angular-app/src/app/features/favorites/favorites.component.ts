import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable, combineLatest, map } from 'rxjs';
import { selectFavorites, selectAllCharacters } from '../../state/characters/character.selectors';
import { Character } from '../../core/models/character.model';
import { selectCharacter } from '../../state/characters/character.actions';

@Component({
    selector: 'app-favorites',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './favorites.component.html'
})
export class FavoritesComponent {
    favoriteCharacters$: Observable<Character[]>;

    constructor(private store: Store) {
        this.favoriteCharacters$ = combineLatest([
            this.store.select(selectFavorites),
            this.store.select(selectAllCharacters)
        ]).pipe(
            map(([favoriteIds, allCharacters]) =>
                allCharacters.filter(char => favoriteIds.includes(char.id))
            )
        );
    }

    selectFavorite(character: Character): void {
        this.store.dispatch(selectCharacter({ character }));
    }
}
