import { Route, Routes } from '@angular/router';

/**
 * FgTranslateRouterInterface -
 * Allows usage of translated routes based on ngx-translate
 */
export interface FgTranslateRouterInterface {
  /**
   * Gets config of @angular/router router-instance and updates
   * it with translated values - and setups listeners for translate-router-service
   */
  init(): Routes;
  /** Methode used to attach translated child-routes to router-config */
  updateRoutConfiguration(routes: Routes): Routes;
  /** Methode used to attach translated child-routes to router-config */
  addChildModuleRoutes(routes: Routes): Routes;
  /** Returns set of tranlated routes */
  translateRoutes(routes: Routes): Routes;
  /** Returns a translated route, also recursivly translates sets of child-routes */
  translateRoute(route: Route): Route;
  /** Receive the translation matching the passed path-segments */
  getTranslatedUrl(url: string): string;
  /**
   * Methode to receive the untranslated url from the translated one, based
   * on the router-config url redirecting to the translation
   */
  getOriginalUrl(url: string): string;
}
