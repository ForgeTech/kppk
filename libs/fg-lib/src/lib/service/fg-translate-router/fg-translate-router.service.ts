import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Router, Routes, Route } from '@angular/router';
import {
  TranslateService,
  LangChangeEvent,
  MissingTranslationHandler,
  FakeMissingTranslationHandler,
} from '@ngx-translate/core';
import { FgTranslateRouterInterface } from './fg-translate-router.interface';

/**
 * FgTranslationRouterService -
 * Placeholder-Service used to be overriden by injecting
 * the actual FgTranslationRouterService e.g currently available
 * FgTranslationRouterNgxTranslateService ( based on ngxTranslate-package )
 * of FgTranslationRouterTranslocoService.
 * CAUTION! IF NONE OF THE MENTIONED SERVICES IS PROVIDED VIA ANGULAR DI
 * THIS SERVICE DOESN'T PERFORM ANY TRANSLATIONS
 */
@Injectable({
  providedIn: 'root',
})
export abstract class FgTranslateRouterService implements FgTranslateRouterInterface {
  /**
   * Hold the unchanged route-config taken from router
   * before route-tranlsation took place
   */
  protected untranslatedRoutes: Routes;
  /** Maps translated url-segments to there translation-keys */
  protected translationToTranslationKey: any;
  /** CONSTRUCTOR */
  constructor(public $router: Router) {}
  /** TODO: Working on methode to implement lazy-loaded child-route translations */
  public addChildModuleRoutes(routes: Routes): Routes {
    return routes;
  }
  /**
   * Gets config of @angular/router router-instance and updates
   * it with translated values - and setups listeners for translate-router-service
   */
  public init(): Routes {
    return this.$router.config;
  }
  /** Methode used to attach translated child-routes to router-config */
  public updateRoutConfiguration(routes: Routes): Routes {
    return routes;
  }
  /**
   * Methode to receive the untranslated url from the translated one, based
   * on the router-config url redirecting to the translation
   */
  public getOriginalUrl(url: string): string {
    return url;
  }
  /**
   * Returns set of tranlated routes
   * @param routes The set of ( untranslated - with segments matching translation-keys ) routes to translate
   */
  public translateRoutes(routes: Routes): Routes {
    return routes;
  }
  /**
   * Returns a translated route, also recursivly translates sets of child-routes
   * @param route
   */
  public translateRoute(route: Route): Route {
    return route;
  }
  /**
   * Receive the translation matching the passed path-segments
   * @param path
   */
  public getTranslatedUrl(url: string): string {
    return url;
  }
}
