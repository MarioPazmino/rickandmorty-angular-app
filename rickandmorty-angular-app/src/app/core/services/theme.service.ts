import { Injectable, signal, effect } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ThemeService {
    darkMode = signal<boolean>(false);

    constructor() {
        // Check system preference or local storage
        const isDark = localStorage.getItem('theme') === 'dark' ||
            (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);

        this.darkMode.set(isDark);

        effect(() => {
            const isDark = this.darkMode();
            console.log('Theme changed:', isDark ? 'Dark' : 'Light');

            // Disable transitions temporarily to prevent flashing/inconsistency
            const style = document.createElement('style');
            style.innerHTML = '* { transition: none !important; }';
            document.head.appendChild(style);

            if (isDark) {
                document.documentElement.classList.add('dark');
                localStorage.setItem('theme', 'dark');
            } else {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('theme', 'light');
            }

            // Force reflow/repaint
            const _ = window.getComputedStyle(document.documentElement).opacity;

            // Re-enable transitions after a small delay
            setTimeout(() => {
                document.head.removeChild(style);
            }, 50);
        });
    }

    toggle() {
        this.darkMode.update(v => !v);
    }
}
