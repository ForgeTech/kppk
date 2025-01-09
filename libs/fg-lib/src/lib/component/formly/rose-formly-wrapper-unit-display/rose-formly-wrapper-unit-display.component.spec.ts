import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoseFormlyUnitDisplayComponent } from './rose-formly-unit-display.component';

describe('RoseFormlyUnitDisplayComponent', () => {
  let component: RoseFormlyUnitDisplayComponent;
  let fixture: ComponentFixture<RoseFormlyUnitDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RoseFormlyUnitDisplayComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoseFormlyUnitDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
