import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FgSwUpdateModalComponent } from './fg-sw-update-modal.component';

describe('FgSwUpdateModalComponent', () => {
  let component: FgSwUpdateModalComponent;
  let fixture: ComponentFixture<FgSwUpdateModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [FgSwUpdateModalComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FgSwUpdateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
