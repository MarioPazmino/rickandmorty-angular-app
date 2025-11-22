import { TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach } from 'vitest';
import { CharacterContextService } from './character-context.service';
import { RestCharacterRepository } from '../../data/repositories/rest-character.repository';
import { GraphqlCharacterRepository } from '../../data/repositories/graphql-character.repository';
import { HttpClient } from '@angular/common/http';
import { Apollo } from 'apollo-angular';

describe('CharacterContextService', () => {
    let service: CharacterContextService;
    let httpClientMock: any;
    let apolloMock: any;

    beforeEach(() => {
        httpClientMock = { get: () => { } };
        apolloMock = { query: () => { }, watchQuery: () => { } };

        TestBed.configureTestingModule({
            providers: [
                CharacterContextService,
                RestCharacterRepository,
                GraphqlCharacterRepository,
                { provide: HttpClient, useValue: httpClientMock },
                { provide: Apollo, useValue: apolloMock }
            ]
        });

        service = TestBed.inject(CharacterContextService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should default to REST API', () => {
        const repository = service.getRepository();
        expect(repository).toBeInstanceOf(RestCharacterRepository);
    });

    it('should return current API type', () => {
        expect(service.getCurrentApi()).toBe('REST');
    });
});
