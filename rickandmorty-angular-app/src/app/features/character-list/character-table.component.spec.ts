import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach } from 'vitest';
import { CharacterTableComponent } from './character-table.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StatusBadgeComponent } from '../../shared/components/ui/status-badge.component';

describe('CharacterTableComponent', () => {
    let component: CharacterTableComponent;
    let fixture: ComponentFixture<CharacterTableComponent>;
    let store: MockStore;

    const initialState = {
        characters: {
            characters: [],
            loading: false,
            favorites: [],
            info: { count: 0, pages: 0, next: null, prev: null }
        }
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CharacterTableComponent, CommonModule, ReactiveFormsModule, StatusBadgeComponent],
            providers: [provideMockStore({ initialState })]
        }).compileComponents();

        fixture = TestBed.createComponent(CharacterTableComponent);
        component = fixture.componentInstance;
        store = TestBed.inject(MockStore);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should initialize filter form with empty values', () => {
        expect(component.filterForm.value).toEqual({
            name: '',
            status: '',
            species: '',
            type: '',
            gender: ''
        });
    });

    it('should have observables defined', () => {
        expect(component.characters$).toBeDefined();
        expect(component.loading$).toBeDefined();
        expect(component.info$).toBeDefined();
        expect(component.favorites$).toBeDefined();
    });
});
