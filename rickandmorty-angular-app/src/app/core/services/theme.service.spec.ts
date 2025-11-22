import { TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
    let service: ThemeService;

    beforeEach(() => {
        // Mock window.matchMedia
        Object.defineProperty(window, 'matchMedia', {
            writable: true,
            value: vi.fn().mockImplementation(query => ({
                matches: false,
                media: query,
                onchange: null,
                addListener: vi.fn(),
                removeListener: vi.fn(),
                addEventListener: vi.fn(),
                removeEventListener: vi.fn(),
                dispatchEvent: vi.fn(),
            })),
        });

        // Mock localStorage
        const localStorageMock = {
            getItem: vi.fn(),
            setItem: vi.fn(),
            clear: vi.fn(),
            removeItem: vi.fn(),
            length: 0,
            key: vi.fn()
        };
        Object.defineProperty(window, 'localStorage', {
            value: localStorageMock,
            writable: true
        });

        // Mock document.documentElement
        Object.defineProperty(document, 'documentElement', {
            value: {
                classList: {
                    add: vi.fn(),
                    remove: vi.fn(),
                    contains: vi.fn()
                }
            },
            writable: true,
            configurable: true
        });

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
});
