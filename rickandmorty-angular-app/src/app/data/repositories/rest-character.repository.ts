import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { CharacterRepository, CharacterFullDetails } from '../../core/repositories/character.repository';
import { Character, CharacterFilter, ApiResponse } from '../../core/models/character.model';

@Injectable({
    providedIn: 'root'
})
export class RestCharacterRepository extends CharacterRepository {
    private readonly API_URL = 'https://rickandmortyapi.com/api/character';

    constructor(private http: HttpClient) {
        super();
    }

    getAll(page: number = 1, filter?: CharacterFilter): Observable<ApiResponse<Character>> {
        let params = new HttpParams().set('page', page.toString());

        if (filter) {
            if (filter.name) params = params.set('name', filter.name);
            if (filter.status) params = params.set('status', filter.status);
            if (filter.species) params = params.set('species', filter.species);
            if (filter.type) params = params.set('type', filter.type);
            if (filter.gender) params = params.set('gender', filter.gender);
        }

        return this.http.get<ApiResponse<Character>>(this.API_URL, { params });
    }

    getById(id: number): Observable<Character> {
        return this.http.get<Character>(`${this.API_URL}/${id}`);
    }

    getMultiple(ids: number[]): Observable<Character[]> {
        return this.http.get<Character[]>(`${this.API_URL}/${ids.join(',')}`);
    }

    getDetails(character: Character): Observable<CharacterFullDetails> {
        const origin$ = character.origin.url ? this.http.get<any>(character.origin.url).pipe(
            switchMap(origin => {
                if (origin.residents && origin.residents.length > 0) {
                    // Fetch just the first resident
                    return this.http.get<Character>(origin.residents[0]).pipe(
                        map(resident => ({ ...origin, residents: [resident] }))
                    );
                }
                return of({ ...origin, residents: [] });
            })
        ) : of(null);

        const location$ = character.location.url ? this.http.get<any>(character.location.url).pipe(
            switchMap(location => {
                if (location.residents && location.residents.length > 0) {
                    return this.http.get<Character>(location.residents[0]).pipe(
                        map(resident => ({ ...location, residents: [resident] }))
                    );
                }
                return of({ ...location, residents: [] });
            })
        ) : of(null);

        // Get one episode (the first one)
        const episodeUrl = character.episode && character.episode.length > 0 ? character.episode[0] : null;
        const episode$ = episodeUrl ? this.http.get<any>(episodeUrl) : of(null);

        return forkJoin({
            origin: origin$,
            location: location$,
            episode: episode$
        });
    }
}
