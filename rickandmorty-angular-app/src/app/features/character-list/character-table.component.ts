import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, debounceTime, distinctUntilChanged } from 'rxjs';
import { Character, CharacterFilter } from '../../core/models/character.model';
import { loadCharacters, selectCharacter, toggleFavorite } from '../../state/characters/character.actions';
import { selectAllCharacters, selectLoading, selectFavorites, selectCharacterInfo } from '../../state/characters/character.selectors';
import { StatusBadgeComponent } from '../../shared/components/ui/status-badge.component';
import { SkeletonComponent } from '../../shared/components/ui/skeleton.component';

@Component({
  selector: 'app-character-table',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, StatusBadgeComponent, SkeletonComponent],
  templateUrl: './character-table.component.html'
})
export class CharacterTableComponent implements OnInit {
  characters$: Observable<Character[]>;
  loading$: Observable<boolean>;
  info$: Observable<any>;
  favorites$: Observable<number[]>;

  filterForm: FormGroup;
  currentPage = 1;

  constructor(
    private store: Store,
    private fb: FormBuilder
  ) {
    this.characters$ = this.store.select(selectAllCharacters);
    this.loading$ = this.store.select(selectLoading);
    this.info$ = this.store.select(selectCharacterInfo);
    this.favorites$ = this.store.select(selectFavorites);

    this.filterForm = this.fb.group({
      name: [''],
      status: [''],
      species: [''],
      type: [''],
      gender: ['']
    });
  }

  ngOnInit() {
    this.store.dispatch(loadCharacters({ page: 1 }));

    this.filterForm.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr))
    ).subscribe(filter => {
      this.currentPage = 1;
      this.store.dispatch(loadCharacters({ page: 1, filter }));
    });
  }

  select(character: Character) {
    this.store.dispatch(selectCharacter({ character }));
  }

  toggleFav(event: Event, id: number) {
    event.stopPropagation();
    this.store.dispatch(toggleFavorite({ characterId: id }));
  }

  isFavorite(id: number): Observable<boolean> {
    return new Observable(observer => {
      this.favorites$.subscribe(favs => {
        observer.next(favs.includes(id));
      });
    });
  }

  changePage(page: number) {
    this.currentPage = page;
    this.store.dispatch(loadCharacters({ page, filter: this.filterForm.value }));
  }

  get nextPage() { return this.currentPage + 1; }
  get prevPage() { return this.currentPage - 1; }
}
