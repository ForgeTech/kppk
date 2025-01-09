import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FgSwUpdateBannerComponent } from './fg-sw-update-banner.component';

describe('FgSwUpdateBannerComponent', () => {
  let component: FgSwUpdateBannerComponent;
  let fixture: ComponentFixture<FgSwUpdateBannerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [FgSwUpdateBannerComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FgSwUpdateBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
