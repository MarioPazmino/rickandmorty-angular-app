import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectCurrentApi } from '../../../state/characters/character.selectors';
import { setApiType } from '../../../state/characters/character.actions';
import { ApiType } from '../../../core/services/character-context.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-api-toggle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './api-toggle.component.html'
})
export class ApiToggleComponent {
  currentApi$: Observable<ApiType>;

  constructor(private store: Store) {
    this.currentApi$ = this.store.select(selectCurrentApi);
  }

  setApi(apiType: ApiType) {
    this.store.dispatch(setApiType({ apiType }));
  }
}
