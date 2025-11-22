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
  templateUrl: './totals.component.html'
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
