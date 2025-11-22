import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiToggleComponent } from '../../shared/components/api-toggle/api-toggle.component';
import { CharacterTableComponent } from '../character-list/character-table.component';
import { CharacterDetailComponent } from '../character-detail/character-detail.component';
import { TotalsComponent } from '../totals/totals.component';
import { ThemeService } from '../../core/services/theme.service';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [
        CommonModule,
        ApiToggleComponent,
        CharacterTableComponent,
        CharacterDetailComponent,
        TotalsComponent
    ],
    template: `
    <div class="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300 p-4 md:p-8 font-sans">
      <!-- Header -->
      <header class="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div class="flex items-center space-x-4">
          <h1 class="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
            Rick & Morty App
          </h1>
        </div>
        
        <div class="flex items-center space-x-4">
          <app-api-toggle></app-api-toggle>
          
          <button 
            (click)="themeService.toggle()" 
            class="p-2 rounded-full bg-white dark:bg-gray-800 shadow-md text-gray-800 dark:text-yellow-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            title="Toggle Theme"
          >
            <span *ngIf="themeService.darkMode()">☀️</span>
            <span *ngIf="!themeService.darkMode()">🌙</span>
          </button>
        </div>
      </header>

      <!-- Main Content -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Left: Table (2 cols) -->
        <div class="lg:col-span-2">
           <app-character-table></app-character-table>
           <app-totals></app-totals>
        </div>

        <!-- Right: Detail (1 col) -->
        <div class="lg:col-span-1">
           <div class="sticky top-4">
             <app-character-detail></app-character-detail>
           </div>
        </div>
      </div>
      
      <!-- Footer / Totals -->
      <footer class="mt-12 text-center text-gray-500 dark:text-gray-400 text-sm">
        <p>Rick and Morty Angular App - 2025</p>
      </footer>
    </div>
  `
})
export class DashboardComponent {
    constructor(public themeService: ThemeService) { }
}
