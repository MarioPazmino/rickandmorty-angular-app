import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { selectAllCharacters } from '../../state/characters/character.selectors';
import { Character } from '../../core/models/character.model';
import { CardComponent } from '../../shared/components/ui/card.component';

@Component({
  selector: 'app-totals',
  standalone: true,
  imports: [CommonModule, CardComponent],
  template: `
    <div class="mt-6">
      <app-card>
        <h3 class="text-lg font-bold text-gray-800 dark:text-white mb-4">Page Statistics</h3>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Species Count -->
          <div>
            <h4 class="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">By Species</h4>
            <ul class="space-y-1">
              <li *ngFor="let item of speciesCount$ | async | keyvalue" class="flex justify-between text-sm">
                <span class="text-gray-700 dark:text-gray-300">{{ item.key }}</span>
                <span class="font-bold text-blue-600 dark:text-blue-400">{{ item.value }}</span>
              </li>
            </ul>
          </div>

          <!-- Type Count -->
          <div>
            <h4 class="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">By Type</h4>
            <ul class="space-y-1">
              <li *ngFor="let item of typeCount$ | async | keyvalue" class="flex justify-between text-sm">
                <span class="text-gray-700 dark:text-gray-300">{{ item.key || 'Unknown/None' }}</span>
                <span class="font-bold text-purple-600 dark:text-purple-400">{{ item.value }}</span>
              </li>
            </ul>
          </div>
        </div>
      </app-card>
    </div>
  `
})
export class TotalsComponent {
  speciesCount$: Observable<{ [key: string]: number }>;
  typeCount$: Observable<{ [key: string]: number }>;

  constructor(private store: Store) {
    this.speciesCount$ = this.store.select(selectAllCharacters).pipe(
      map(chars => this.countByAttribute(chars, 'species'))
    );

    this.typeCount$ = this.store.select(selectAllCharacters).pipe(
      map(chars => this.countByAttribute(chars, 'type'))
    );
  }

  private countByAttribute(chars: Character[], attr: keyof Character): { [key: string]: number } {
    return chars.reduce((acc, char) => {
      const value = (char[attr] as string) || 'Unknown';
      acc[value] = (acc[value] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });
  }
}
