import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-skeleton',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './skeleton.component.html',
    styleUrls: ['./skeleton.component.css']
})
export class SkeletonComponent {
    @Input() type: 'card' | 'table' | 'detail' = 'card';
    @Input() count: number = 1;

    get items(): number[] {
        return Array(this.count).fill(0);
    }
}
