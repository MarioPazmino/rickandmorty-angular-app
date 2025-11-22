import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach } from 'vitest';
import { DashboardComponent } from './dashboard.component';
import { ThemeService } from '../../core/services/theme.service';
import { signal } from '@angular/core';
import { ApiToggleComponent } from '../../shared/components/api-toggle/api-toggle.component';
import { CharacterTableComponent } from '../character-list/character-table.component';
import { CharacterDetailComponent } from '../character-detail/character-detail.component';
import { TotalsComponent } from '../totals/totals.component';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// Mocks for child components
@Component({ selector: 'app-api-toggle', standalone: true, template: '' })
class MockApiToggleComponent { }

@Component({ selector: 'app-character-table', standalone: true, template: '' })
class MockCharacterTableComponent { }

@Component({ selector: 'app-character-detail', standalone: true, template: '' })
class MockCharacterDetailComponent { }

@Component({ selector: 'app-totals', standalone: true, template: '' })
class MockTotalsComponent { }

// Mock for ThemeService
class MockThemeService {
    darkMode = signal(false);
    toggle() {
        this.darkMode.set(!this.darkMode());
    }
}

describe('DashboardComponent', () => {
    let component: DashboardComponent;
    let fixture: ComponentFixture<DashboardComponent>;
    let themeService: MockThemeService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DashboardComponent, CommonModule],
            providers: [
                { provide: ThemeService, useClass: MockThemeService }
            ]
        })
            .overrideComponent(DashboardComponent, {
                set: {
                    imports: [
                        CommonModule,
                        MockApiToggleComponent,
                        MockCharacterTableComponent,
                        MockCharacterDetailComponent,
                        MockTotalsComponent
                    ]
                }
            })
            .compileComponents();

        fixture = TestBed.createComponent(DashboardComponent);
        component = fixture.componentInstance;
        themeService = TestBed.inject(ThemeService) as unknown as MockThemeService;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display the correct title', () => {
        const compiled = fixture.nativeElement as HTMLElement;
        const title = compiled.querySelector('h1');
        expect(title?.textContent).toContain('Rick & Morty App');
    });

    it('should toggle theme when button is clicked', () => {
        const compiled = fixture.nativeElement as HTMLElement;
        const button = compiled.querySelector('button[title="Toggle Theme"]') as HTMLButtonElement;


        expect(themeService.darkMode()).toBe(false);

        button.click();
        fixture.detectChanges();

        expect(themeService.darkMode()).toBe(true);
    });
});
