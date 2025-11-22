import { Injectable } from '@angular/core';
import { CharacterRepository } from '../repositories/character.repository';
import { RestCharacterRepository } from '../../data/repositories/rest-character.repository';
import { GraphqlCharacterRepository } from '../../data/repositories/graphql-character.repository';

export type ApiType = 'REST' | 'GRAPHQL';

@Injectable({
    providedIn: 'root'
})
export class CharacterContextService {
    private currentApi: ApiType = 'REST';

    constructor(
        private restRepo: RestCharacterRepository,
        private gqlRepo: GraphqlCharacterRepository
    ) { }

    setApi(api: ApiType) {
        this.currentApi = api;
    }

    getCurrentApi(): ApiType {
        return this.currentApi;
    }

    getRepository(): CharacterRepository {
        return this.currentApi === 'REST' ? this.restRepo : this.gqlRepo;
    }
}
