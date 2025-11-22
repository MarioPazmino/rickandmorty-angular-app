import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach } from 'vitest';
import { CardComponent } from './card.component';
import { CommonModule } from '@angular/common';

describe('CardComponent', () => {
    let component: CardComponent;
    let fixture: ComponentFixture<CardComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CardComponent, CommonModule]
        }).compileComponents();

        fixture = TestBed.createComponent(CardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should render content projection', () => {
        const compiled = fixture.nativeElement as HTMLElement;
        expect(compiled.querySelector('div')).toBeTruthy();
    });
});
