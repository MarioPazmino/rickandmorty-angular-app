import { Observable } from 'rxjs';
import { Character, CharacterFilter, ApiResponse } from '../models/character.model';

export interface LocationDetails {
    name: string;
    type: string;
    dimension: string;
    residents: Character[];
}

export interface EpisodeDetails {
    name: string;
    air_date: string;
    episode: string;
    characters: Character[];
}

export interface CharacterFullDetails {
    origin: LocationDetails | null;
    location: LocationDetails | null;
    episode: EpisodeDetails | null;
}

export abstract class CharacterRepository {
    abstract getAll(page?: number, filter?: CharacterFilter): Observable<ApiResponse<Character>>;
    abstract getById(id: number): Observable<Character>;
    abstract getMultiple(ids: number[]): Observable<Character[]>;
    abstract getDetails(character: Character): Observable<CharacterFullDetails>;
}
