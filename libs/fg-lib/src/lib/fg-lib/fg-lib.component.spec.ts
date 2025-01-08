import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FgLibComponent } from './fg-lib.component';

describe('FgLibComponent', () => {
  let component: FgLibComponent;
  let fixture: ComponentFixture<FgLibComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FgLibComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FgLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
