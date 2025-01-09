import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { KppkReactComponent } from './layout-print-outlet.component';
import { PlaceholderComponent } from './placeholder.component';
import { Router, RouterModule } from '@angular/router';

describe('KppkReactComponent', () => {
  let app: KppkReactComponent;
  let fixture: ComponentFixture<KppkReactComponent>
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
        KppkReactComponent,
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(KppkReactComponent);
    app = fixture.componentInstance;
  });

  describe('>> class"', () => {
    it('should create the app', () => {
      expect(app).toBeTruthy();
    });
  
    it(`should have as title 'react-host'`, () => {
      expect(app.title).toEqual('react-host');
    });
    
  });

  describe('>> template"', () => {
    let template: HTMLElement;

    beforeEach(fakeAsync(() => {
      const fixture = TestBed.createComponent(KppkReactComponent);
      const router = TestBed.inject(Router);
      fixture.ngZone?.run(() => router.navigate(['']));
      tick();
      fixture.detectChanges();
      template = fixture.nativeElement as HTMLElement;
    }));

    describe('>> section ".page-content"', () => {
      let pageContentSections: HTMLCollectionOf<Element>
      beforeEach( () => {
        pageContentSections = template.getElementsByClassName('page-content')
      })
      it('single instance exists', () => {
        expect(pageContentSections.length).toBe(1);
        expect(pageContentSections[0].tagName.toLowerCase()).toBe('section');
      });
      it('contains single instance of router-outlet ".content-outlet"', () => {
        const routerOutlets = pageContentSections[0].getElementsByTagName('router-outlet');
        expect(routerOutlets.length).toBe(1);
        expect(routerOutlets[0].classList.contains('content-outlet')).toBeTruthy();
      });
    });

    describe('>> section ".print-content"', () => {
      let printContentSections: HTMLCollectionOf<Element>
      beforeEach( () => {
        printContentSections = template.getElementsByClassName('print-content')
      })
      it('single instance exists', () => {
        expect(printContentSections.length).toBe(1);
        expect(printContentSections[0].tagName.toLowerCase()).toBe('section');
      });
      it('contains single instance of router-outlet ".print-outlet"', () => {
        const routerOutlets = printContentSections[0].getElementsByTagName('router-outlet');
        expect(routerOutlets.length).toBe(1);
        expect(routerOutlets[0].classList.contains('print-outlet')).toBeTruthy();
      });
      it('router-outlet ".print-outlet" has name of "print-outlet"', () => {
        const routerOutlets = printContentSections[0].getElementsByTagName('router-outlet');
        expect(routerOutlets[0].hasAttribute('name')).toBeTruthy();
        expect(routerOutlets[0].getAttribute('name')).toBe('print-outlet');
      });
    });

  });

  describe( '>> behaviour', () => {

    describe('>> when only default router-outlet is active', () => {
      let template: HTMLElement;
      beforeEach(fakeAsync(() => {
        const fixture = TestBed.createComponent(KppkReactComponent);
        const router = TestBed.inject(Router);
        fixture.ngZone?.run(() => router.navigate(['']));
        tick();
        fixture.detectChanges();
        template = fixture.nativeElement as HTMLElement;
      }));
      it('section ".page-content" is visible', () => {
        const pageContentSections = template.getElementsByClassName('page-content');
        expect(pageContentSections.length).toBe(1);
        expect(pageContentSections[0].classList.contains('invisible')).toBeFalsy();
      })
      it('section ".print-content" is invisible', () => {
        const printContentSections = template.getElementsByClassName('print-content');
        expect(printContentSections.length).toBe(1);
        expect(printContentSections[0].classList.contains('invisible')).toBeTruthy();
      })
    });
 
    describe('>> when default and ".print-outlet" router-outlets are active', () => {
      let template: HTMLElement;
      beforeEach(fakeAsync(() => {
        const fixture = TestBed.createComponent(KppkReactComponent);
        const router = TestBed.inject(Router);
        fixture.ngZone?.run(() => router.navigate(['', {
          outlets: {
            'print-outlet': ['print']
          }
        }]));
        tick();
        fixture.detectChanges();
        template = fixture.nativeElement as HTMLElement;
      }));
      it('section ".page-content" is invisible', () => {
        const pageContentSections = template.getElementsByClassName('page-content');
        expect(pageContentSections.length).toBe(1);
        expect(pageContentSections[0].classList.contains('invisible')).toBeTruthy();
      })
      it('section ".print-content" is visible', () => {
        const printContentSections = template.getElementsByClassName('print-content');
        expect(printContentSections.length).toBe(1);
        expect(printContentSections[0].classList.contains('invisible')).toBeFalsy();
      })
    });

  })

});
