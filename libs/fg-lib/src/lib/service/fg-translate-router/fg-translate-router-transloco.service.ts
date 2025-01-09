import { FgActiveRouteService } from '../fg-active-route/fg-active-route.service';
// import { FgTranslateGuard } from '../../guards/fg-translate/fg-translate.guard';
import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Router, Routes, Route } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';
import { FgTranslateRouterInterface } from './fg-translate-router.interface';
import { distinctUntilChanged } from 'rxjs/operators';

/**
 * FgTranslateRouterTranslocoService -
 * Allows usage of translated routes based on transloco
 * angular-localization package
 */
@Injectable({
  providedIn: 'root',
})
export class FgTranslateRouterTranslocoService implements FgTranslateRouterInterface {
  /**
   * Hold the unchanged route-config taken from router
   * before route-tranlsation took place
   */
  protected untranslatedRoutes: Routes = [];
  /** Maps translated url-segments to there translation-keys */
  protected translationToTranslationKey: any;
  /** CONSTRUCTOR */
  constructor(
    public $translation: TranslocoService,
    // public $translationGuard: FgTranslateGuard,
    // public $keys: AppRouteTranslationKeys,
    public $router: Router,
    public $activeRoute: FgActiveRouteService,
    public $location: Location,
  ) {}
  /** TODO: Working on methode to implement lazy-loaded child-route translations */
  public addChildModuleRoutes(routes: Routes): Routes {
    // console.log('LAZY_LOADED_CHILD_ROUTES');
    const translatedRouteConfig = this.translateRouteConfig(routes);
    // console.table( translatedRouteConfig );
    return translatedRouteConfig;
  }
  /**
   * Gets config of @angular/router router-instance and updates
   * it with translated values - and setups listeners for translate-router-service
   */
  public init(): Routes {
    this.translationToTranslationKey = {};
    this.untranslatedRoutes = Object.assign([], this.$router.config);
    const translatedRouteConfig = this.translateRouteConfig(this.untranslatedRoutes);
    console.log('TRANSLATED ROUTES');
    console.table(translatedRouteConfig);
    this.$router.resetConfig(translatedRouteConfig);
    // Subscribe to language-changes
    this.$translation.langChanges$.pipe(distinctUntilChanged()).subscribe(lang => {
      // Get original/untranslated url to have a redirect to updated/tranlated
      // routes (take url from location as router, may not be updated when url-path is
      // changed using location )
      const originalUrl = this.getOriginalUrl(this.$location.path());
      console.log('ORIGINAL URL: ', this.$location.path(), ' : ', originalUrl);
      console.log('LANG-UPDATE: TRANSLATE ROUTE: ', this.$translation.getActiveLang());
      console.table(this.untranslatedRoutes);
      // Reset object holding translated url-segments, so it can later be used
      // for receiving original url
      this.translationToTranslationKey = {};
      // Update router with routes according to newly set
      const translatedRouteConfig = this.translateRouteConfig(this.untranslatedRoutes);
      console.log('TRANSLATED ROUTES');
      console.table(translatedRouteConfig);
      this.$router.resetConfig(translatedRouteConfig);
      this.$router.navigateByUrl(originalUrl);
    });
    this.$router.navigateByUrl(this.getTranslatedUrl(this.$location.path()));
    return translatedRouteConfig;
  }
  /** Methode used to attach translated child-routes to router-config */
  public updateRoutConfiguration(routes: Routes): Routes {
    this.untranslatedRoutes = Object.assign([], this.$router.config);
    const translatedRouteConfig = this.translateRouteConfig(this.untranslatedRoutes);
    return translatedRouteConfig;
  }
  /**
   * Methode to receive the untranslated url from the translated one, based
   * on the router-config url redirecting to the translation
   */
  public getOriginalUrl(url: string): string {
    const originalUrlSegments: string[] = [];
    // Remove leading '/' if existing
    if (url.indexOf('/') === 0) {
      url = url.replace('/', '');
    }
    // Split url-path into segments, that should equal a tranlation-key, that should be translated
    const urlSegments: string[] = url.split('/');
    urlSegments.forEach((segment: string, index: number) => {
      // Check if first element is a language-prefix
      const foundTranslation = this.translationToTranslationKey[segment];
      if (
        index === 0 &&
        this.$translation.getAvailableLangs().indexOf(foundTranslation) !== -1
        // && this.$translation.defaultLang === segment
      ) {
        // Ignore language prefix
      } else {
        originalUrlSegments.push(foundTranslation ? foundTranslation : segment);
      }
    });
    return originalUrlSegments.join('/');
  }
  /**
   * Returns set of tranlated routes
   * @param routes The set of ( untranslated - with segments matching translation-keys ) routes to translate
   */
  public translateRoutes(routes: Routes): Routes {
    let translatedRoutes: Routes = [];
    routes.forEach(route => translatedRoutes.push(this.translateRoute(route)));
    return translatedRoutes;
  }
  /**
   * Returns a translated route, also recursivly translates sets of child-routes
   * @param route
   */
  public translateRoute(route: Route): Route {
    const tranlatedRoute = Object.assign({}, route);
    if (route.path) {
      tranlatedRoute.path = this.$translation.translate(route.path);
    }
    if (tranlatedRoute.redirectTo) {
      tranlatedRoute.redirectTo = this.$translation.translate(route.redirectTo);
    }
    if (tranlatedRoute.children) {
      tranlatedRoute.children = this.translateRoutes(route.children);
    }
    return tranlatedRoute;
  }
  /**
   * Receive the translation matching the passed path-segments
   * @param path
   */
  public getTranslatedUrl(url: string): string {
    return ''; // this.guardAgainstCustomMissingTranslationHandler( this.unguardedGetUrlTranslation.bind( this ), url );
  }
  /**
   * Methode translates and resets the routers config
   */
  protected translateRouteConfig(untranslatedRoutes: Route[]): Route[] {
    const translatedRouteConfig: Routes = [];
    // Iterate top-level original routes to create redirects to translated urls
    untranslatedRoutes.forEach((route: Route) => {
      console.log('TRY TRANSLATION: ' + route.path);
      const translatedRoute = this.translateRoute(route);
      console.log('RESULT: ', translatedRoute.path);
      // Check if path of translated route and route match
      if (translatedRoute.path !== route.path) {
        // otherwise create new route from original-route, redirecting to translated-route
        let redirectRoute: Route = {};
        redirectRoute.path = route.path;
        redirectRoute.redirectTo = translatedRoute.path;
        translatedRouteConfig.push(redirectRoute);
        translatedRouteConfig.push(translatedRoute);
      } else {
        translatedRouteConfig.push(translatedRoute);
      }
    });
    return translatedRouteConfig;
    // this.$router.resetConfig( translatedRouteConfig );
  }
}
