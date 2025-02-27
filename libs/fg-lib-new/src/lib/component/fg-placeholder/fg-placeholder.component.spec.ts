import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FgPlaceholderComponent } from './fg-placeholder.component';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';

describe('PlaceholderComponent', () => {
  let fixture: ComponentFixture<FgPlaceholderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FgPlaceholderComponent],
      providers: [provideExperimentalZonelessChangeDetection()],
    }).compileComponents();
    fixture = TestBed.createComponent(FgPlaceholderComponent);
    fixture.isStable();
  });

  it('should create component', () => {
    expect(fixture.checkNoChanges).toBeTruthy();
  });
});
