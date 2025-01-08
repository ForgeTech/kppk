import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactLibComponent } from './react-lib.component';

describe('ReactLibComponent', () => {
  let component: ReactLibComponent;
  let fixture: ComponentFixture<ReactLibComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactLibComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ReactLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
