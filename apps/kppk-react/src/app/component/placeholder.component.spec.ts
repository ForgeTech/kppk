import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlaceholderComponent } from './placeholder.component';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';

describe('PlaceholderComponent', () => {
  let fixture: ComponentFixture<PlaceholderComponent>;

  beforeEach( () => {
    TestBed.configureTestingModule({
      imports: [PlaceholderComponent],
      providers: [
        provideExperimentalZonelessChangeDetection()
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(PlaceholderComponent);
    fixture.isStable();
  });

  it('should create', () => {
    expect(fixture.checkNoChanges).toBeTruthy();
  });
});
