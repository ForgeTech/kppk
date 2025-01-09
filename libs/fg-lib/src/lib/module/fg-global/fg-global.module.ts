import { NgModule, ModuleWithProviders } from '@angular/core';
import { FgGlobalService } from './fg-global.service';
import { FgBrowserGlobalService } from './fg-global-browser.service';
import { FgNodeGlobalService } from './fg-global-node.service';
/**
 * FgGlobalScopeModule -
 * Module providing a access to an environments
 * native global-scope context
 */
@NgModule({})
export class FgGlobalScopeModule {
  /**
   * Provides global-scope context for browser-environments
   */
  static forBrowser(): ModuleWithProviders<FgGlobalScopeModule> {
    return {
      ngModule: FgGlobalScopeModule,
      providers: [{ provide: FgGlobalService, useClass: FgBrowserGlobalService }],
    };
  }
  /**
   * Provides global-scope context for nodejs-environment
   */
  static forNode(): ModuleWithProviders<FgGlobalScopeModule> {
    return {
      ngModule: FgGlobalScopeModule,
      providers: [{ provide: FgGlobalService, useClass: FgNodeGlobalService }],
    };
  }
}
