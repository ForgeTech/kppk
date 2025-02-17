import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeactivateGuardDefaultDialogComponent } from './deactivate_guard_default_dialog.component';

describe('DeactivateGuardDefaultDialogComponent', () => {
  let component: DeactivateGuardDefaultDialogComponent;
  let fixture: ComponentFixture<DeactivateGuardDefaultDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeactivateGuardDefaultDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DeactivateGuardDefaultDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
