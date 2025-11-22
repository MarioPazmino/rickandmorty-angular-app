import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-card',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-colors duration-300 h-full">
      <ng-content></ng-content>
    </div>
  `
})
export class CardComponent { }
