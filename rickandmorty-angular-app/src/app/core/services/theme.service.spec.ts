import { TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach } from 'vitest';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
    let service: ThemeService;

    beforeEach(() => {
        // Limpiar localStorage antes de cada test
        localStorage.clear();

        TestBed.configureTestingModule({
            providers: [ThemeService]
        });

        service = TestBed.inject(ThemeService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should initialize with light mode by default', () => {
        expect(service.darkMode()).toBe(false);
    });

    it('should toggle dark mode', () => {
        expect(service.darkMode()).toBe(false);

        service.toggle();
        expect(service.darkMode()).toBe(true);

        service.toggle();
        expect(service.darkMode()).toBe(false);
    });

    it('should persist dark mode preference in localStorage', () => {
        service.toggle();
        expect(localStorage.getItem('darkMode')).toBe('true');

        service.toggle();
        expect(localStorage.getItem('darkMode')).toBe('false');
    });
});
