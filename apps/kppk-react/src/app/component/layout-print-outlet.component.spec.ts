import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { KppkReactComponent } from './layout-print-outlet.component';
import { PlaceholderComponent } from './placeholder.component';
import { Router, RouterModule } from '@angular/router';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import exp from 'constants';

describe('KppkReactComponent', () => {
  let router: Router;
  let fixture: ComponentFixture<KppkReactComponent>;
  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([
          { path: '', component: PlaceholderComponent },
          {
            outlet: 'print-outlet',
            path: 'print',
            component: PlaceholderComponent,
          },
        ]),
        KppkReactComponent,
      ],
      providers: [provideExperimentalZonelessChangeDetection()],
    }).compileComponents();
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(KppkReactComponent);
    await fixture.whenStable();
  });

  describe('>> class"', () => {
    it('should create the app', () => {
      expect(fixture.componentInstance).toBeTruthy();
    });

    it(`should have as title 'react-host'`, () => {
      expect(fixture.componentInstance.title).toEqual('react-host');
    });
  });

  describe('>> template"', () => {
    beforeEach(async () => {
      // fixture = TestBed.createComponent(KppkReactComponent);
      router.navigate(['']);
      await fixture.whenStable();
    });

    describe('>> section ".page-content"', () => {
      let pageContentSections: HTMLCollectionOf<Element>;
      beforeEach(() => {
        pageContentSections =
          fixture.nativeElement.getElementsByClassName('page-content');
      });
      it('single instance exists', () => {
        expect(pageContentSections.length).toBe(1);
        expect(pageContentSections[0].tagName.toLowerCase()).toBe('section');
      });
      it('contains single instance of router-outlet ".content-outlet"', () => {
        const routerOutlets =
          pageContentSections[0].getElementsByTagName('router-outlet');
        expect(routerOutlets.length).toBe(1);
        expect(
          routerOutlets[0].classList.contains('content-outlet')
        ).toBeTruthy();
      });
    });

    describe('>> section ".print-content"', () => {
      let printContentSections: HTMLCollectionOf<Element>;
      beforeEach(() => {
        printContentSections =
          fixture.nativeElement.getElementsByClassName('print-content');
      });
      it('single instance exists', () => {
        expect(printContentSections.length).toBe(1);
        expect(printContentSections[0].tagName.toLowerCase()).toBe('section');
      });
      it('contains single instance of router-outlet ".print-outlet"', () => {
        const routerOutlets =
          printContentSections[0].getElementsByTagName('router-outlet');
        expect(routerOutlets.length).toBe(1);
        expect(
          routerOutlets[0].classList.contains('print-outlet')
        ).toBeTruthy();
      });
      it('router-outlet ".print-outlet" has name of "print-outlet"', () => {
        const routerOutlets =
          printContentSections[0].getElementsByTagName('router-outlet');
        expect(routerOutlets[0].hasAttribute('name')).toBeTruthy();
        expect(routerOutlets[0].getAttribute('name')).toBe('print-outlet');
      });
    });
  });

  describe('>> behaviour', () => {
    describe('>> when only default router-outlet is active', () => {
      beforeEach(async () => {
        router.navigate(['']);
        await fixture.whenStable();
      });
      it('section ".page-content" is visible', () => {
        const pageContentSections =
          fixture.nativeElement.getElementsByClassName('page-content');
        expect(pageContentSections.length).toBe(1);
        expect(
          pageContentSections[0].classList.contains('invisible')
        ).toBeFalsy();
      });
      it('section ".print-content" is invisible', () => {
        const printContentSections =
          fixture.nativeElement.getElementsByClassName('print-content');
        expect(printContentSections.length).toBe(1);
        expect(
          printContentSections[0].classList.contains('invisible')
        ).toBeTruthy();
      });
    });

    describe('>> when default and ".print-outlet" router-outlets are active', () => {
      beforeEach(async () => {
        router = TestBed.inject(Router);
        router.navigate([
          '',
          {
            outlets: {
              'print-outlet': ['print'],
            },
          },
        ]);
        fixture.componentInstance['print_outlet_activatedS'].set(true);
        await fixture.whenStable();
      });
      it('route is', () => {
        expect(router.url).toBe('/(print-outlet:print)');
        expect(fixture.componentInstance['print_outlet_activatedS']()).toBe(
          true
        );
      });
      it('section ".page-content" is invisible', () => {
        const pageContentSections =
          fixture.nativeElement.getElementsByClassName('page-content');
        expect(pageContentSections.length).toBe(1);
        expect(
          pageContentSections[0].classList.contains('invisible')
        ).toBeTruthy();
      });
      it('section ".print-content" is visible', () => {
        const printContentSections =
          fixture.nativeElement.getElementsByClassName('print-content');
        expect(printContentSections.length).toBe(1);
        expect(
          printContentSections[0].classList.contains('invisible')
        ).toBeFalsy();
      });
    });
  });
});
