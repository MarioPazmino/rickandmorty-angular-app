import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, debounceTime, distinctUntilChanged } from 'rxjs';
import { Character, CharacterFilter } from '../../core/models/character.model';
import { loadCharacters, selectCharacter, toggleFavorite } from '../../state/characters/character.actions';
import { selectAllCharacters, selectLoading, selectFavorites, selectCharacterInfo } from '../../state/characters/character.selectors';
import { StatusBadgeComponent } from '../../shared/components/ui/status-badge.component';

@Component({
  selector: 'app-character-table',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, StatusBadgeComponent],
  template: `
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-colors duration-300">
      <!-- Filters -->
      <form [formGroup]="filterForm" class="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
          <input 
            type="text" 
            formControlName="name" 
            class="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-colors"
            placeholder="Search by name..."
          >
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
          <select 
            formControlName="status" 
            class="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-colors"
          >
            <option value="">All</option>
            <option value="alive">Alive</option>
            <option value="dead">Dead</option>
            <option value="unknown">Unknown</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Species</label>
          <input 
            type="text" 
            formControlName="species" 
            class="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-colors"
            placeholder="Search by species..."
          >
        </div>
      </form>

      <!-- Loading State -->
      <div *ngIf="loading$ | async" class="flex justify-center py-8">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>

      <!-- Table -->
      <div class="overflow-x-auto" *ngIf="!(loading$ | async)">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead class="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Species</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Type</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Gender</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Created</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            <tr 
              *ngFor="let char of characters$ | async" 
              (click)="select(char)"
              class="hover:bg-blue-50 dark:hover:bg-gray-700 cursor-pointer transition-colors duration-300"
            >
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="text-sm font-medium text-gray-900 dark:text-white">{{ char.name }}</div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <app-status-badge [status]="char.status">{{ char.status }}</app-status-badge>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{{ char.species }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{{ char.type || '-' }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{{ char.gender }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{{ char.created | date:'shortDate' }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button 
                  (click)="toggleFav($event, char.id)" 
                  class="text-yellow-500 hover:text-yellow-600 focus:outline-none"
                >
                  <span *ngIf="isFavorite(char.id) | async">★</span>
                  <span *ngIf="!(isFavorite(char.id) | async)">☆</span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="flex items-center justify-between mt-4" *ngIf="info$ | async as info">
        <div class="text-sm text-gray-700 dark:text-gray-300">
          Total: {{ info.count }} characters
        </div>
        <div class="flex space-x-2">
          <button 
            [disabled]="!info.prev"
            (click)="changePage(prevPage)"
            class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button 
            [disabled]="!info.next"
            (click)="changePage(nextPage)"
            class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  `
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
