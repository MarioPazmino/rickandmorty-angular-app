import { TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { RestCharacterRepository } from './rest-character.repository';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { firstValueFrom } from 'rxjs';

describe('RestCharacterRepository', () => {
    let repository: RestCharacterRepository;
    let httpClientMock: any;

    beforeEach(() => {
        httpClientMock = {
            get: vi.fn()
        };

        TestBed.configureTestingModule({
            providers: [
                RestCharacterRepository,
                { provide: HttpClient, useValue: httpClientMock }
            ]
        });

        repository = TestBed.inject(RestCharacterRepository);
    });

    it('should be created', () => {
        expect(repository).toBeTruthy();
    });

    it('should call getAll and return characters', async () => {
        const mockResponse = {
            info: { count: 826, pages: 42, next: 'next-url', prev: null },
            results: [
                { id: 1, name: 'Rick Sanchez', status: 'Alive', species: 'Human', type: '', gender: 'Male', origin: { name: 'Earth' }, location: { name: 'Earth' }, image: '', episode: [], created: '2017-11-04T18:48:46.250Z' }
            ]
        };

        httpClientMock.get.mockReturnValue(of(mockResponse));

        const response = await firstValueFrom(repository.getAll(1));
        expect(response.info.count).toBe(826);
        expect(response.results.length).toBe(1);
        expect(response.results[0].name).toBe('Rick Sanchez');
    });

    it('should call getById and return a character', async () => {
        const mockCharacter = {
            id: 1,
            name: 'Rick Sanchez',
            status: 'Alive',
            species: 'Human',
            type: '',
            gender: 'Male',
            origin: { name: 'Earth' },
            location: { name: 'Earth' },
            image: '',
            episode: [],
            created: '2017-11-04T18:48:46.250Z'
        };

        httpClientMock.get.mockReturnValue(of(mockCharacter));

        const character = await firstValueFrom(repository.getById(1));
        expect(character.id).toBe(1);
        expect(character.name).toBe('Rick Sanchez');
    });
});
