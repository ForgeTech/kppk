import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { provideRouter, Router, RouterModule } from '@angular/router';
import { test_environment, KppkRegisterIconsService } from '@kppk/react-lib'
import { appRoutes } from './app.routes';
import { importProvidersFrom, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { FG_ENVIRONMENT, FgEnvironmentService } from '@kppk/fg-lib-new';
import { provideAutoSpy } from "jest-auto-spies";
import { LoggerTestingModule } from 'ngx-logger/testing';
import { AppService } from './app.service';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>
  beforeEach( async() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule
      ],
      providers: [
        provideRouter(appRoutes),
        provideExperimentalZonelessChangeDetection(),
        provideAutoSpy(KppkRegisterIconsService),
        provideAutoSpy(AppService),
        importProvidersFrom(LoggerTestingModule),
        provideAutoSpy(FgEnvironmentService),
        { provide: FG_ENVIRONMENT, useValue: test_environment },
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    await fixture.whenStable();
  });

  describe('>> class"', () => {
    it('should create the app', () => {
      expect(fixture.componentInstance).toBeTruthy();
    });
    it(`should have as title 'react-host'`, () => {
      expect(fixture.componentInstance.title).toEqual('kppk-react');
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
