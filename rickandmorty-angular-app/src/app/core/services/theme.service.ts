import { Injectable, signal, effect } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ThemeService {
    darkMode = signal<boolean>(false);

    constructor() {

        const isDark = localStorage.getItem('theme') === 'dark' ||
            (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);

        this.darkMode.set(isDark);

        effect(() => {
            const isDark = this.darkMode();
            console.log('Theme changed:', isDark ? 'Dark' : 'Light');


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


            const _ = window.getComputedStyle(document.documentElement).opacity;


            setTimeout(() => {
                document.head.removeChild(style);
            }, 50);
        });
    }

    toggle() {
        this.darkMode.update(v => !v);
    }
}
