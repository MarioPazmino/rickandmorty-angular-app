import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach } from 'vitest';
import { CharacterDetailComponent } from './character-detail.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { CharacterContextService } from '../../core/services/character-context.service';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../shared/components/ui/card.component';
import { StatusBadgeComponent } from '../../shared/components/ui/status-badge.component';

describe('CharacterDetailComponent', () => {
    let component: CharacterDetailComponent;
    let fixture: ComponentFixture<CharacterDetailComponent>;
    let store: MockStore;
    let contextService: any;

    const initialState = {
        characters: {
            selectedCharacter: null
        }
    };

    beforeEach(async () => {
        const mockContextService = {
            getRepository: () => ({
                getDetails: () => of(null)
            })
        };

        await TestBed.configureTestingModule({
            imports: [CharacterDetailComponent, CommonModule, CardComponent, StatusBadgeComponent],
            providers: [
                provideMockStore({ initialState }),
                { provide: CharacterContextService, useValue: mockContextService }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(CharacterDetailComponent);
        component = fixture.componentInstance;
        store = TestBed.inject(MockStore);
        contextService = TestBed.inject(CharacterContextService);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have character$ observable defined', () => {
        expect(component.character$).toBeDefined();
    });

    it('should initialize with no details', () => {
        expect(component.details).toBeNull();
        expect(component.loadingDetails).toBe(false);
    });
});
