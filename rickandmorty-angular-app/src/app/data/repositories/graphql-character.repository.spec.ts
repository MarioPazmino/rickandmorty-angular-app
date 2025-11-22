import { TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { GraphqlCharacterRepository } from './graphql-character.repository';
import { Apollo } from 'apollo-angular';
import { of } from 'rxjs';
import { firstValueFrom } from 'rxjs';

describe('GraphqlCharacterRepository', () => {
    let repository: GraphqlCharacterRepository;
    let apolloMock: any;

    beforeEach(() => {
        apolloMock = {
            query: vi.fn(),
            watchQuery: vi.fn()
        };

        TestBed.configureTestingModule({
            providers: [
                GraphqlCharacterRepository,
                { provide: Apollo, useValue: apolloMock }
            ]
        });

        repository = TestBed.inject(GraphqlCharacterRepository);
    });

    it('should be created', () => {
        expect(repository).toBeTruthy();
    });

    it('should call getAll and return characters from GraphQL', async () => {
        const mockResponse = {
            data: {
                characters: {
                    info: { count: 826, pages: 42, next: 2, prev: null },
                    results: [
                        {
                            id: '1',
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
                        }
                    ]
                }
            }
        };

        apolloMock.query.mockReturnValue(of(mockResponse));

        const response = await firstValueFrom(repository.getAll(1));
        expect(response.info.count).toBe(826);
        expect(response.results.length).toBe(1);
        expect(response.results[0].name).toBe('Rick Sanchez');
    });

    it('should call getById and return a character from GraphQL', async () => {
        const mockResponse = {
            data: {
                character: {
                    id: '1',
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
                }
            }
        };

        apolloMock.query.mockReturnValue(of(mockResponse));

        const character = await firstValueFrom(repository.getById(1));
        expect(character.id).toBe('1'); // GraphQL returns string IDs
        expect(character.name).toBe('Rick Sanchez');
    });
});
