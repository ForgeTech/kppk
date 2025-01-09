import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { PlaceholderComponent  } from '@forgetech/fg-lib'
import { Router, RouterModule } from '@angular/router';

describe('AppComponent', () => {
  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([
          { path: '', component: PlaceholderComponent },
          {
            outlet: 'print-outlet',
            path: 'print',
            component: PlaceholderComponent
          },
        ]),
        AppComponent,
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
  });

  describe('>> class"', () => {
    it('should create the app', () => {
      expect(app).toBeTruthy();
    });
  
    it(`should have as title 'react-host'`, () => {
      expect(app.title).toEqual('kppk-react');
    });
    
  });

  describe('>> template"', () => {
    let template: HTMLElement;

    beforeEach(fakeAsync(() => {
      const fixture = TestBed.createComponent(AppComponent);
      const router = TestBed.inject(Router);
      fixture.ngZone?.run(() => router.navigate(['']));
      tick();
      fixture.detectChanges();
      template = fixture.nativeElement as HTMLElement;
    }));

    it('contains single instance of router-outlet', () => {
      const outlets = template.getElementsByTagName('router-outlet');
      expect(outlets.length).toBe(1);
    })
  })
});
