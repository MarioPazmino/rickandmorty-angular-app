import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-status-badge',
    standalone: true,
    imports: [CommonModule],
    template: `
    <span [ngClass]="badgeClasses" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
      <ng-content></ng-content>
    </span>
  `
})
export class StatusBadgeComponent {
    @Input() status: string = '';

    get badgeClasses(): string {
        switch (this.status.toLowerCase()) {
            case 'alive': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
            case 'dead': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
            default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
        }
    }
}
