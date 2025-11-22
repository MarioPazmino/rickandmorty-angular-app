import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach } from 'vitest';
import { TotalsComponent } from './totals.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../shared/components/ui/card.component';

describe('TotalsComponent', () => {
    let component: TotalsComponent;
    let fixture: ComponentFixture<TotalsComponent>;
    let store: MockStore;

    const initialState = {
        characters: {
            characters: [
                { id: 1, name: 'Rick', species: 'Human', type: '', status: 'Alive', gender: 'Male', created: '2017-11-04T18:48:46.250Z', image: '', origin: { name: 'Earth' }, location: { name: 'Earth' }, episode: [] },
                { id: 2, name: 'Morty', species: 'Human', type: '', status: 'Alive', gender: 'Male', created: '2017-11-04T18:50:21.651Z', image: '', origin: { name: 'Earth' }, location: { name: 'Earth' }, episode: [] }
            ]
        }
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TotalsComponent, CommonModule, CardComponent],
            providers: [provideMockStore({ initialState })]
        }).compileComponents();

        fixture = TestBed.createComponent(TotalsComponent);
        component = fixture.componentInstance;
        store = TestBed.inject(MockStore);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have speciesCount$ observable defined', () => {
        expect(component.speciesCount$).toBeDefined();
    });

    it('should have typeCount$ observable defined', () => {
        expect(component.typeCount$).toBeDefined();
    });
});
