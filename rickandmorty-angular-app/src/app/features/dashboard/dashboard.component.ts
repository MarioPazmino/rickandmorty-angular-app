import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiToggleComponent } from '../../shared/components/api-toggle/api-toggle.component';
import { CharacterTableComponent } from '../character-list/character-table.component';
import { CharacterDetailComponent } from '../character-detail/character-detail.component';
import { TotalsComponent } from '../totals/totals.component';
import { ThemeService } from '../../core/services/theme.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    ApiToggleComponent,
    CharacterTableComponent,
    CharacterDetailComponent,
    TotalsComponent
  ],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {
  constructor(public themeService: ThemeService) { }
}
