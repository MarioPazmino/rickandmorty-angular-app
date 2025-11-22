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
    template: `
    <div class="flex items-center space-x-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
      <span class="text-gray-700 dark:text-gray-200 font-medium">Data Source:</span>
      
      <div class="relative inline-flex bg-gray-200 dark:bg-gray-700 rounded-full p-1 cursor-pointer transition-colors duration-300">
        <button 
          (click)="setApi('REST')"
          [class.bg-blue-600]="(currentApi$ | async) === 'REST'"
          [class.text-white]="(currentApi$ | async) === 'REST'"
          [class.text-gray-600]="(currentApi$ | async) !== 'REST'"
          [class.dark:text-gray-300]="(currentApi$ | async) !== 'REST'"
          class="px-4 py-1 rounded-full text-sm font-semibold transition-all duration-300 focus:outline-none"
        >
          REST
        </button>
        
        <button 
          (click)="setApi('GRAPHQL')"
          [class.bg-purple-600]="(currentApi$ | async) === 'GRAPHQL'"
          [class.text-white]="(currentApi$ | async) === 'GRAPHQL'"
          [class.text-gray-600]="(currentApi$ | async) !== 'GRAPHQL'"
          [class.dark:text-gray-300]="(currentApi$ | async) !== 'GRAPHQL'"
          class="px-4 py-1 rounded-full text-sm font-semibold transition-all duration-300 focus:outline-none"
        >
          GraphQL
        </button>
      </div>

      <div class="text-xs text-gray-500 dark:text-gray-400 ml-2">
        Current: <span class="font-bold">{{ (currentApi$ | async) }}</span>
      </div>
    </div>
  `
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
