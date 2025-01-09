import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoseFormlyWrapperMultiplyFieldComponent } from './rose-formly-wrapper-multiply-field.component';

describe('RoseFormlyMultiplyFieldComponent', () => {
  let component: RoseFormlyWrapperMultiplyFieldComponent;
  let fixture: ComponentFixture<RoseFormlyWrapperMultiplyFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RoseFormlyWrapperMultiplyFieldComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoseFormlyWrapperMultiplyFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
