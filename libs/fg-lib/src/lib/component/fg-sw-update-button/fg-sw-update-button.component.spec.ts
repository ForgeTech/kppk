import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FgSwUpdateButtonComponent } from './fg-sw-update-button.component';

describe('FgSwUpdateButtonComponent', () => {
  let component: FgSwUpdateButtonComponent;
  let fixture: ComponentFixture<FgSwUpdateButtonComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [FgSwUpdateButtonComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FgSwUpdateButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
