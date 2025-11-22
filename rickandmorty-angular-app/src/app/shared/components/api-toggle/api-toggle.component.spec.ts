import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach } from 'vitest';
import { ApiToggleComponent } from './api-toggle.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { CommonModule } from '@angular/common';

describe('ApiToggleComponent', () => {
    let component: ApiToggleComponent;
    let fixture: ComponentFixture<ApiToggleComponent>;
    let store: MockStore;

    const initialState = {
        characters: {
            currentApi: 'REST'
        }
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ApiToggleComponent, CommonModule],
            providers: [provideMockStore({ initialState })]
        }).compileComponents();

        fixture = TestBed.createComponent(ApiToggleComponent);
        component = fixture.componentInstance;
        store = TestBed.inject(MockStore);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have currentApi$ observable defined', () => {
        expect(component.currentApi$).toBeDefined();
    });
});
