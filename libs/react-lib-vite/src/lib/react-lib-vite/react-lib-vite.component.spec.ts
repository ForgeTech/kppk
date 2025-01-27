import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactLibViteComponent } from './react-lib-vite.component';

describe('ReactLibViteComponent', () => {
  let component: ReactLibViteComponent;
  let fixture: ComponentFixture<ReactLibViteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactLibViteComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ReactLibViteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
