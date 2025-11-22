import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach } from 'vitest';
import { StatusBadgeComponent } from './status-badge.component';
import { CommonModule } from '@angular/common';

describe('StatusBadgeComponent', () => {
    let component: StatusBadgeComponent;
    let fixture: ComponentFixture<StatusBadgeComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [StatusBadgeComponent, CommonModule]
        }).compileComponents();

        fixture = TestBed.createComponent(StatusBadgeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should return green classes for alive status', () => {
        component.status = 'Alive';
        expect(component.badgeClasses).toContain('bg-green-100');
    });

    it('should return red classes for dead status', () => {
        component.status = 'Dead';
        expect(component.badgeClasses).toContain('bg-red-100');
    });

    it('should return gray classes for unknown status', () => {
        component.status = 'unknown';
        expect(component.badgeClasses).toContain('bg-gray-100');
    });
});
