import { FgActiveRouteService } from '../fg-active-route/fg-active-route.service';
import { FgTranslateGuard } from '../../guards/fg-translate/fg-translate.guard';
import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Router, Routes, Route } from '@angular/router';
import { AppRouteTranslationKeys } from 'src/app/app-route.translation.keys';
import {
  TranslateService,
  LangChangeEvent,
  MissingTranslationHandler,
  FakeMissingTranslationHandler,
} from '@ngx-translate/core';
import { FgTranslateRouterInterface } from './fg-translate-router.interface';

/**
 * FgTranslateRouterNgxTranslateService -
 * Allows usage of translated routes based on ngx-translate
 * npm-package
 */
@Injectable({
  providedIn: 'root',
})
export class FgTranslateRouterNgxTranslateService implements FgTranslateRouterInterface {
  /**
   * Hold the unchanged route-config taken from router
   * before route-tranlsation took place
   */
  protected untranslatedRoutes: Routes;
  /** Maps translated url-segments to there translation-keys */
  protected translationToTranslationKey: any;
  /** CONSTRUCTOR */
  constructor(
    public $translation: TranslateService,
    public $translationGuard: FgTranslateGuard,
    public $keys: AppRouteTranslationKeys,
    public $router: Router,
    public $activeRoute: FgActiveRouteService,
    public $location: Location
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
    // console.log( 'INIT_ROUTER_TRANSLATION' );
    this.translationToTranslationKey = {};
    this.untranslatedRoutes = Object.assign([], this.$router.config);
    const translatedRouteConfig = this.updateRoutConfiguration(this.untranslatedRoutes);
    this.$router.resetConfig(translatedRouteConfig);
    // console.log( 'translatedRouteConfig' );
    // console.table( translatedRouteConfig );
    // Subscribe to language-changes
    this.$translation.onLangChange.subscribe((event: LangChangeEvent) => {
      // Get original/untranslated url to have a redirect to updated/tranlated
      // routes (take url from location as router, may not be updated when url-path is
      // changed using location )
      const originalUrl = this.getOriginalUrl(this.$location.path());
      // Reset object holding translated url-segments, so it can later be used
      // for receiving original url
      this.translationToTranslationKey = {};
      // Update router with routes according to newly set
      const translatedRouteConfig = this.translateRouteConfig(this.untranslatedRoutes);
      console.log('translatedRouteConfig');
      console.table(translatedRouteConfig);
      this.$router.resetConfig(translatedRouteConfig);
      this.$router.navigateByUrl(this.getTranslatedUrl(originalUrl));
    });
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
        this.$translation.langs.indexOf(segment) !== -1
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
    return this.guardAgainstCustomMissingTranslationHandler(this.unguardedTranslateRoutes.bind(this), routes);
  }
  /**
   * Returns a translated route, also recursivly translates sets of child-routes
   * @param route
   */
  public translateRoute(route: Route): Route {
    return this.guardAgainstCustomMissingTranslationHandler(this.unguardedTranslateRoute.bind(this), route);
  }
  /**
   * Receive the translation matching the passed path-segments
   * @param path
   */
  public getTranslatedUrl(url: string): string {
    return this.guardAgainstCustomMissingTranslationHandler(this.unguardedGetUrlTranslation.bind(this), url);
  }
  /**
   * Methode translates and resets the routers config
   */
  protected translateRouteConfig(untranslatedRoutes: Route[]): Route[] {
    const translatedRouteConfig: Routes = [];
    // Iterate top-level original routes to create redirects to translated urls
    untranslatedRoutes.forEach((route: Route) => {
      const translatedRoute = this.translateRoute(route);
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
  /**
   * Methode detects if ngxTranslation-service is used with a custom MissingTranslationHandler, and
   * if so resets him to FakeMissingTranslationHandler, which does nothing and leads to passed translation-key
   * being returned, until translation-function has finished.
   * @param translateFunction
   * @param param
   */
  protected guardAgainstCustomMissingTranslationHandler(translateFunction: (param: any) => any, param: any): any {
    let result: Route | Routes;
    // If missing translationHandler isn't default-handler returning passed key, if no tranlation is found
    // cache it so it can be restored after translating routes
    let cachedMissingTranslationHandler: MissingTranslationHandler;
    if (!(this.$translation.missingTranslationHandler instanceof FakeMissingTranslationHandler)) {
      cachedMissingTranslationHandler = this.$translation.missingTranslationHandler;
      this.$translation.missingTranslationHandler = new FakeMissingTranslationHandler();
    }
    result = translateFunction(param);
    // If custom MissingTranlation was found restore previous
    if (cachedMissingTranslationHandler) {
      this.$translation.missingTranslationHandler = cachedMissingTranslationHandler;
    }
    return result;
  }
  /**
   * CAUTION! DOESN'T RESET POSSIBLE CUSTOM TRANSLATION-MISSING-HANDLER
   * Returns a translated route, also recursivly translates sets of child-routes
   * @param route
   */
  protected unguardedTranslateRoute(route: Route): Route {
    const tranlatedRoute = Object.assign({}, route);
    if (route.path) {
      tranlatedRoute.path = this.unguardedGetUrlTranslation(route.path);
    }
    if (tranlatedRoute.redirectTo) {
      tranlatedRoute.redirectTo = this.unguardedGetUrlTranslation(route.redirectTo);
    }
    if (tranlatedRoute.children) {
      tranlatedRoute.children = this.unguardedTranslateRoutes(route.children);
    }
    return tranlatedRoute;
  }
  /**
   * CAUTION! DOESN'T RESET POSSIBLE CUSTOM TRANSLATION-MISSING-HANDLER
   * Returns set of tranlated routes
   * @param routes The set of ( untranslated - with segments matching translation-keys ) routes to translate
   */
  protected unguardedTranslateRoutes(routes: Routes): Routes {
    const translatedRoutes: Routes = [];
    routes.forEach((route: Route) => {
      translatedRoutes.push(this.unguardedTranslateRoute(route));
    });
    return translatedRoutes;
  }
  /**
   * CAUTION! DOESN'T RESET POSSIBLE CUSTOM TRANSLATION-MISSING-HANDLER
   * Receive the translation matching the passed path-segments
   * @param path
   */
  protected unguardedGetUrlTranslation(urlPath: string): string {
    const prefix =
      this.$translation.currentLang === this.$translation.defaultLang ? '' : this.$translation.currentLang.concat('/');
    let translation: string = '';
    // Make sure url-path doesn't contain leading '/'
    if (urlPath.indexOf('/') === 0) {
      urlPath.replace('/', '');
    }
    // Split url-path into segments, that should equal a tranlation-key, that should be translated
    const urlSegments: string[] = urlPath.split('/');
    urlSegments.forEach((segment: string, index: number) => {
      const translatedSegment = this.$translation.instant(segment);
      this.translationToTranslationKey[translatedSegment] = segment;
      urlSegments[index] = translation.concat(translatedSegment);
    });
    const joinedUrl = urlSegments.join('/');
    translation = joinedUrl ? prefix.concat(urlSegments.join('/')) : '';
    return translation;
  }
}
