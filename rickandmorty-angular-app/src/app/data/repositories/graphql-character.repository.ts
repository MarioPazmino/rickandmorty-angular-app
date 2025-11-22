import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable, map } from 'rxjs';
import { CharacterRepository, CharacterFullDetails } from '../../core/repositories/character.repository';
import { Character, CharacterFilter, ApiResponse } from '../../core/models/character.model';

@Injectable({
  providedIn: 'root'
})
export class GraphqlCharacterRepository extends CharacterRepository {

  constructor(private apollo: Apollo) {
    super();
  }

  getAll(page: number = 1, filter?: CharacterFilter): Observable<ApiResponse<Character>> {
    const GET_CHARACTERS = gql`
      query GetCharacters($page: Int, $filter: FilterCharacter) {
        characters(page: $page, filter: $filter) {
          info {
            count
            pages
            next
            prev
          }
          results {
            id
            name
            status
            species
            type
            gender
            image
            created
            origin {
              name
            }
            location {
              name
            }
            episode {
              name
            }
          }
        }
      }
    `;

    return this.apollo.query<any>({
      query: GET_CHARACTERS,
      variables: {
        page,
        filter
      }
    }).pipe(
      map(result => {
        const data = result.data.characters;
        return {
          info: data.info,
          results: data.results.map((char: any) => ({
            ...char,
            episode: char.episode.map((ep: any) => ep.name)
          }))
        };
      })
    );
  }

  getById(id: number): Observable<Character> {
    const GET_CHARACTER = gql`
      query GetCharacter($id: ID!) {
        character(id: $id) {
          id
          name
          status
          species
          type
          gender
          image
          created
          origin {
            name
            dimension
          }
          location {
            name
            dimension
          }
          episode {
            name
            episode
          }
        }
      }
    `;

    return this.apollo.query<any>({
      query: GET_CHARACTER,
      variables: { id }
    }).pipe(
      map(result => result.data.character)
    );
  }

  getMultiple(ids: number[]): Observable<Character[]> {
    const GET_CHARACTERS_BY_IDS = gql`
      query GetCharactersByIds($ids: [ID!]!) {
        charactersByIds(ids: $ids) {
          id
          name
          status
          species
          type
          gender
          image
          created
           origin {
            name
          }
          location {
            name
          }
        }
      }
    `;
    return this.apollo.query<any>({
      query: GET_CHARACTERS_BY_IDS,
      variables: { ids }
    }).pipe(
      map(result => result.data.charactersByIds)
    );
  }

  getDetails(character: Character): Observable<CharacterFullDetails> {
    const GET_DETAILS = gql`
      query GetDetails($id: ID!) {
        character(id: $id) {
          origin {
            name
            type
            dimension
            residents {
              id
              name
              image
              status
            }
          }
          location {
            name
            type
            dimension
            residents {
              id
              name
              image
              status
            }
          }
          episode {
            name
            air_date
            episode
            characters {
               name
            }
          }
        }
      }
    `;

    return this.apollo.query<any>({
      query: GET_DETAILS,
      variables: { id: character.id }
    }).pipe(
      map(result => {
        const char = result.data.character;
        // We need to take just one resident/episode as per requirement or structure
        // But the interface allows array.
        // However, the GQL returns ALL residents. We might want to slice them in UI or here.
        // Let's return as is, but we need to match the interface.

        // Note: episode in GQL returns ALL episodes the character is in.
        // The requirement says "Obtain information of a SINGLE episode".
        // We can just take the first one from the list.

        const firstEpisode = char.episode && char.episode.length > 0 ? char.episode[0] : null;

        return {
          origin: char.origin,
          location: char.location,
          episode: firstEpisode
        };
      })
    );
  }
}
