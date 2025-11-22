import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil, switchMap, of, catchError, tap } from 'rxjs';
import { Character } from '../../core/models/character.model';
import { CharacterFullDetails, CharacterRepository } from '../../core/repositories/character.repository';
import { selectSelectedCharacter } from '../../state/characters/character.selectors';
import { CharacterContextService } from '../../core/services/character-context.service';
import { CardComponent } from '../../shared/components/ui/card.component';
import { StatusBadgeComponent } from '../../shared/components/ui/status-badge.component';
import { SkeletonComponent } from '../../shared/components/ui/skeleton.component';

@Component({
  selector: 'app-character-detail',
  standalone: true,
  imports: [CommonModule, CardComponent, StatusBadgeComponent, SkeletonComponent],
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.css']
})
export class CharacterDetailComponent implements OnInit, OnDestroy {
  character$: Observable<Character | null>;
  details: CharacterFullDetails | null = null;
  loadingDetails = false;
  private destroy$ = new Subject<void>();

  constructor(
    private store: Store,
    private contextService: CharacterContextService
  ) {
    this.character$ = this.store.select(selectSelectedCharacter);
  }

  ngOnInit() {
    this.character$.pipe(
      takeUntil(this.destroy$),
      tap(() => {
        this.details = null;
        this.loadingDetails = true;
      }),
      switchMap(char => {
        if (!char) return of(null);
        return this.contextService.getRepository().getDetails(char).pipe(
          catchError(err => {
            console.error('Error loading details', err);
            return of(null);
          })
        );
      })
    ).subscribe(details => {
      this.details = details;
      this.loadingDetails = false;
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
